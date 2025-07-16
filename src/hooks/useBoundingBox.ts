import { useState, useCallback, useEffect } from 'react';
import type {
  UseBoundingBoxConfig,
  UseBoundingBoxReturn,
  BoundingBox,
} from '@/types';
import { useCanvas } from './useCanvas';
import { useImageLoader } from './useImageLoader';
import { useMouseInteraction } from './useMouseInteraction';
import { useSegmentation } from './useSegmentation';
import { DEFAULT_OPTIONS } from '@/constants/defaults';

/**
 * Main hook that orchestrates all bounding box functionality
 */
export const useBoundingBox = (
  config: UseBoundingBoxConfig
): UseBoundingBoxReturn => {
  const { image, boxes, options = {}, segmentation = {}, onSelection } = config;

  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Hook composition
  const mainCanvas = useCanvas({ style: mergedOptions.style });
  const imageLoader = useImageLoader();
  const segmentationHook = useSegmentation(segmentation);

  const mouseInteraction = useMouseInteraction({
    boxes,
    onSelected: onSelection,
    canvasRef: mainCanvas.canvasRef,
  });

  /**
   * Load and render image on canvas
   */
  const loadAndRenderImage = useCallback(async () => {
    if (!image || !mainCanvas.canvasRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const imageElement = await imageLoader.loadImage(
        mergedOptions.base64Image ? `data:image/png;base64,${image}` : image
      );

      // Resize canvas to match image
      mainCanvas.resizeCanvas(imageElement.width, imageElement.height);

      // Draw image
      if (mainCanvas.context) {
        mainCanvas.context.drawImage(imageElement, 0, 0);
        setImageLoaded(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load image');
    } finally {
      setIsLoading(false);
    }
  }, [image, mainCanvas, imageLoader, mergedOptions.base64Image]);

  /**
   * Render bounding boxes on canvas
   */
  const renderBoxes = useCallback(() => {
    if (!mainCanvas.context || !mainCanvas.canvasRef.current || !imageLoaded)
      return;

    const canvas = mainCanvas.canvasRef.current;
    const ctx = mainCanvas.context;

    // Calculate line width based on canvas size
    let lineWidth = 2;
    if (canvas.width > 600) lineWidth = 3;
    if (canvas.width > 1000) lineWidth = 5;

    // Sort boxes to render selected/hovered ones on top
    const sortedBoxes = boxes
      .map((box, index) => ({
        box,
        index,
        isSelected: index === mouseInteraction.selectedIndex,
        isHovered: index === mouseInteraction.hoveredIndex,
      }))
      .sort((a, b) => {
        if (a.isSelected || a.isHovered) return 1;
        if (b.isSelected || b.isHovered) return -1;
        return 0;
      });

    // Render each box
    sortedBoxes.forEach(({ box, index, isSelected, isHovered }) => {
      let color = mergedOptions.colors.normal;

      if (mouseInteraction.hoveredIndex >= 0) {
        color = mergedOptions.colors.unselected;
      }

      if (isSelected || isHovered) {
        color = mergedOptions.colors.selected;
      }

      drawBox(ctx, box, color, lineWidth);

      // Draw label if present
      if (typeof box === 'object' && 'label' in box && box.label) {
        drawLabel(ctx, box);
      }
    });
  }, [
    mainCanvas.context,
    mainCanvas.canvasRef,
    imageLoaded,
    boxes,
    mouseInteraction.selectedIndex,
    mouseInteraction.hoveredIndex,
    mergedOptions.colors,
  ]);

  /**
   * Default box drawing function
   */
  const drawBox = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      box: BoundingBox,
      color: string,
      lineWidth: number
    ) => {
      try {
        const coord =
          typeof box === 'object' && 'coord' in box ? box.coord : box;
        let [x, y, width, height] = Array.isArray(coord) ? coord : [0, 0, 0, 0];

        // Handle min/max coordinate format
        if (typeof coord === 'object' && 'xmin' in coord) {
          x = Math.min(coord.xmin, coord.xmax);
          y = Math.min(coord.ymin, coord.ymax);
          width = Math.abs(coord.xmax - coord.xmin);
          height = Math.abs(coord.ymax - coord.ymin);
        }

        // Clamp coordinates to canvas bounds
        const canvas = mainCanvas.canvasRef.current!;
        if (x < lineWidth / 2) x = lineWidth / 2;
        if (y < lineWidth / 2) y = lineWidth / 2;
        if (x + width > canvas.width) width = canvas.width - lineWidth - x;
        if (y + height > canvas.height) height = canvas.height - lineWidth - y;

        // Draw segmented corners (original style)
        const tenPercent = width / 10;
        const ninetyPercent = 9 * tenPercent;

        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;

        // Left segment
        ctx.beginPath();
        ctx.moveTo(x + tenPercent, y);
        ctx.lineTo(x, y);
        ctx.lineTo(x, y + height);
        ctx.lineTo(x + tenPercent, y + height);
        ctx.stroke();

        // Right segment
        ctx.beginPath();
        ctx.moveTo(x + ninetyPercent, y);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x + width, y + height);
        ctx.lineTo(x + ninetyPercent, y + height);
        ctx.stroke();
      } catch (err) {
        console.warn('Error drawing box:', err);
      }
    },
    [mainCanvas.canvasRef]
  );

  /**
   * Default label drawing function
   */
  const drawLabel = useCallback((ctx: CanvasRenderingContext2D, box: any) => {
    if (!box.label) return;

    try {
      const coord = box.coord || box;
      let [x, y, width, height] = Array.isArray(coord) ? coord : [0, 0, 0, 0];

      // Handle min/max coordinate format
      if (typeof coord === 'object' && 'xmin' in coord) {
        x = Math.min(coord.xmin, coord.xmax);
        y = Math.min(coord.ymin, coord.ymax);
        width = Math.abs(coord.xmax - coord.xmin);
        height = Math.abs(coord.ymax - coord.ymin);
      }

      ctx.font = '60px Arial';
      ctx.fillStyle = 'rgba(225,0,0,1)';
      ctx.fillText(box.label, x, y + height);
    } catch (err) {
      console.warn('Error drawing label:', err);
    }
  }, []);

  /**
   * Render segmentation overlay
   */
  const renderSegmentation = useCallback(() => {
    if (segmentation.separateCanvas) {
      // Setup separate canvas
      if (
        segmentationHook.segmentationCanvasRef.current &&
        mainCanvas.canvasRef.current
      ) {
        const segCanvas = segmentationHook.segmentationCanvasRef.current;
        const mainCanvasEl = mainCanvas.canvasRef.current;

        segCanvas.width = mainCanvasEl.width;
        segCanvas.height = mainCanvasEl.height;

        segmentationHook.renderSegmentation(
          segmentationHook.segmentationCanvasRef
        );
      }
    } else {
      // Render on main canvas
      segmentationHook.renderSegmentation(mainCanvas.canvasRef);
    }
  }, [segmentation.separateCanvas, segmentationHook, mainCanvas.canvasRef]);

  // Load image when image src changes
  useEffect(() => {
    loadAndRenderImage();
  }, [loadAndRenderImage]);

  // Re-render boxes when relevant dependencies change
  useEffect(() => {
    if (imageLoaded) {
      // Clear and redraw
      loadAndRenderImage().then(() => {
        renderBoxes();
        if (segmentation.segmentationData || segmentation.segmentationMasks) {
          renderSegmentation();
        }
      });
    }
  }, [
    boxes,
    mouseInteraction.selectedIndex,
    mouseInteraction.hoveredIndex,
    mergedOptions.colors,
    imageLoaded,
    renderBoxes,
    renderSegmentation,
    segmentation.segmentationData,
    segmentation.segmentationMasks,
  ]);

  return {
    mainCanvasRef: mainCanvas.canvasRef,
    segmentationCanvasRef: segmentationHook.segmentationCanvasRef,
    selectedIndex: mouseInteraction.selectedIndex,
    hoveredIndex: mouseInteraction.hoveredIndex,
    isLoading,
    error,
    selectBox: mouseInteraction.selectBox,
    renderBoxes,
    renderSegmentation,
    handleMouseMove: mouseInteraction.handleMouseMove,
    handleMouseOut: mouseInteraction.handleMouseOut,
    handleCanvasClick: mouseInteraction.handleCanvasClick,
    clearSelection: mouseInteraction.clearSelection,
    getCurrentBox: mouseInteraction.getCurrentBox,
  };
};
