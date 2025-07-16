import React, { useState, useCallback, useRef, useEffect } from 'react';
import type {
  UseSegmentationConfig,
  UseSegmentationReturn,
  SegmentationMask,
} from '@/types';
import { createColorGenerator } from '@/utils/colorUtils';
import { DEFAULT_SEGMENTATION_TRANSPARENCY } from '@/constants/defaults';
import { segmentationLogger } from '@/utils/logger';

/**
 * Custom hook for handling segmentation rendering and management
 */
export const useSegmentation = (
  config: UseSegmentationConfig
): UseSegmentationReturn => {
  const {
    segmentationData,
    segmentationMasks,
    colors,
    transparency = DEFAULT_SEGMENTATION_TRANSPARENCY,
    separateCanvas = false,
  } = config;

  const segmentationCanvasRef = useRef<HTMLCanvasElement>(null);
  const [segmentColors, setSegmentColors] = useState(
    new Map<number, [number, number, number]>()
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const colorGenerator = useRef(createColorGenerator(colors));

  // Update color generator when colors change
  useEffect(() => {
    colorGenerator.current = createColorGenerator(colors);
    setSegmentColors(new Map()); // Clear cached colors
  }, [colors]);

  /**
   * Generate color for a segmentation class
   */
  const generateSegmentColor = useCallback(
    (classIndex: number): [number, number, number] => {
      if (segmentColors.has(classIndex)) {
        return segmentColors.get(classIndex)!;
      }

      const color = colorGenerator.current(classIndex);
      setSegmentColors((prev: Map<number, [number, number, number]>) => new Map(prev.set(classIndex, color)));
      return color;
    },
    [segmentColors]
  );

  /**
   * Render pixel-level segmentation
   */
  const renderPixelSegmentation = useCallback(
    (canvas: HTMLCanvasElement, segmentation: number[]) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      for (let i = 0, j = 0; i < pixels.length; i += 4, j++) {
        if (j < segmentation.length) {
          const segmentClass = segmentation[j];
          if (segmentClass > 0) {
            const [r, g, b] = generateSegmentColor(segmentClass);

            if (separateCanvas) {
              // Render full opacity on separate canvas
              pixels[i] = r;
              pixels[i + 1] = g;
              pixels[i + 2] = b;
              pixels[i + 3] = 255;
            } else {
              // Blend with existing image
              pixels[i] = Math.round((pixels[i] + r) / 2);
              pixels[i + 1] = Math.round((pixels[i + 1] + g) / 2);
              pixels[i + 2] = Math.round((pixels[i + 2] + b) / 2);
              pixels[i + 3] = transparency;
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    },
    [generateSegmentColor, separateCanvas, transparency]
  );

  /**
   * Render segmentation masks
   */
  const renderSegmentationMasks = useCallback(
    (canvas: HTMLCanvasElement, masks: SegmentationMask[], boxes: any[]) => {
      const ctx = canvas.getContext('2d');
      if (!ctx || !boxes.length) return;

      masks.forEach((mask, index) => {
        if (index >= boxes.length) return;

        const box = boxes[index];
        const segmentColor = generateSegmentColor(box.label || index);

        // Get image data for the mask region
        const maskData = ctx.getImageData(
          parseInt(box.xmin, 10),
          parseInt(box.ymin, 10),
          mask.width,
          mask.height
        );

        // Apply mask data
        for (let i = 0, j = 0; i < maskData.data.length; j++, i += 4) {
          if (j < mask.data.length && mask.data[j] > 0) {
            maskData.data[i] = segmentColor[0];
            maskData.data[i + 1] = segmentColor[1];
            maskData.data[i + 2] = segmentColor[2];
            maskData.data[i + 3] = transparency;
          }
        }

        // Put the modified data back
        ctx.putImageData(
          maskData,
          parseInt(box.xmin, 10),
          parseInt(box.ymin, 10),
          0,
          0,
          mask.width,
          mask.height
        );
      });
    },
    [generateSegmentColor, transparency]
  );

  /**
   * Main segmentation rendering function
   */
  const renderSegmentation = useCallback(
    (targetCanvasRef: React.RefObject<HTMLCanvasElement>) => {
      const targetCanvas = separateCanvas
        ? segmentationCanvasRef.current
        : targetCanvasRef.current;
      if (!targetCanvas) return;

      setIsProcessing(true);

      try {
        // Handle pixel segmentation
        if (segmentationData && segmentationData.length > 0) {
          renderPixelSegmentation(targetCanvas, segmentationData);
        }

        // Handle segmentation masks
        if (segmentationMasks && segmentationMasks.length > 0) {
          // Note: This would need boxes parameter passed in
          // renderSegmentationMasks(targetCanvas, segmentationMasks, boxes);
        }
      } catch (error) {
        segmentationLogger.error('Error rendering segmentation:', error);
      } finally {
        setIsProcessing(false);
      }
    },
    [
      segmentationData,
      segmentationMasks,
      separateCanvas,
      renderPixelSegmentation,
      renderSegmentationMasks,
    ]
  );

  /**
   * Load segmentation from JSON URL
   */
  const loadSegmentationFromUrl = useCallback(async (url: string) => {
    setIsProcessing(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Handle deepdetect format
      if (data.body?.predictions?.[0]?.vals) {
        return data.body.predictions[0].vals;
      }

      return data;
    } catch (error) {
      segmentationLogger.error('Error loading segmentation from URL:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  /**
   * Clear segmentation from canvas
   */
  const clearSegmentation = useCallback(() => {
    if (segmentationCanvasRef.current) {
      const ctx = segmentationCanvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(
          0,
          0,
          segmentationCanvasRef.current.width,
          segmentationCanvasRef.current.height
        );
      }
    }
  }, []);

  /**
   * Get segmentation statistics
   */
  const getSegmentationStats = useCallback(() => {
    if (!segmentationData) return null;

    const classCounts = new Map<number, number>();
    segmentationData.forEach(classIndex => {
      classCounts.set(classIndex, (classCounts.get(classIndex) || 0) + 1);
    });

    return {
      totalPixels: segmentationData.length,
      uniqueClasses: classCounts.size,
      classCounts: Object.fromEntries(classCounts),
      backgroundPixels: classCounts.get(0) || 0,
    };
  }, [segmentationData]);

  return {
    segmentationCanvasRef,
    segmentColors,
    renderSegmentation,
    generateSegmentColor,
    loadSegmentationFromUrl,
    clearSegmentation,
    getSegmentationStats,
    isProcessing,
  };
};
