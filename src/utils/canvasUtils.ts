import type { BoundingBox, CanvasDrawFunction } from '@/types';
import { extractCoordinates, clampToCanvas } from './coordinateUtils';
import { RENDER_BATCH_SIZE } from '@/constants/defaults';
import { canvasLogger } from './logger';

/**
 * High-performance canvas renderer with batching and optimization
 */
export class CanvasRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private renderQueue: Array<() => void> = [];
  private animationFrame: number | null = null;
  private isDirty = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Failed to get 2D rendering context');
    }
    this.ctx = context;

    // Optimize canvas context
    this.optimizeContext();
  }

  /**
   * Optimize canvas context for better performance
   */
  private optimizeContext(): void {
    // Enable image smoothing for better quality
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'high';

    // Set default composite operation for performance
    this.ctx.globalCompositeOperation = 'source-over';
  }

  /**
   * Queue a render function to be executed in the next animation frame
   */
  queueRender(renderFn: () => void): void {
    this.renderQueue.push(renderFn);
    this.isDirty = true;

    if (!this.animationFrame) {
      this.animationFrame = requestAnimationFrame(() => {
        this.flushRenderQueue();
      });
    }
  }

  /**
   * Execute all queued render functions
   */
  private flushRenderQueue(): void {
    if (this.renderQueue.length === 0) {
      this.animationFrame = null;
      return;
    }

    // Save context state
    this.ctx.save();

    try {
      // Process renders in batches for better performance
      for (let i = 0; i < this.renderQueue.length; i += RENDER_BATCH_SIZE) {
        const batch = this.renderQueue.slice(i, i + RENDER_BATCH_SIZE);
        batch.forEach(renderFn => renderFn());
      }
    } finally {
      // Restore context state
      this.ctx.restore();

      // Clear queue and reset frame
      this.renderQueue = [];
      this.animationFrame = null;
      this.isDirty = false;
    }
  }

  /**
   * Clear the canvas efficiently
   */
  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Get the rendering context
   */
  getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }

  /**
   * Check if there are pending renders
   */
  isDirtyFlag(): boolean {
    return this.isDirty;
  }

  /**
   * Force immediate render of all queued operations
   */
  forceRender(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.flushRenderQueue();
    }
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.renderQueue = [];
  }
}

/**
 * Optimized batch rendering for multiple bounding boxes
 */
export const renderBoxesBatched = (
  ctx: CanvasRenderingContext2D,
  boxes: BoundingBox[],
  colors: string[],
  lineWidths: number[],
  drawFunction?: CanvasDrawFunction
): void => {
  // Group boxes by style for batch rendering
  const styleGroups = new Map<
    string,
    Array<{ box: BoundingBox; index: number }>
  >();

  boxes.forEach((box, index) => {
    const color = colors[index] || colors[0] || 'rgba(255,255,255,1)';
    const lineWidth = lineWidths[index] || lineWidths[0] || 2;
    const styleKey = `${color}-${lineWidth}`;

    if (!styleGroups.has(styleKey)) {
      styleGroups.set(styleKey, []);
    }
    styleGroups.get(styleKey)!.push({ box, index });
  });

  // Render each style group in batch
  styleGroups.forEach((groupBoxes, styleKey) => {
    const [color, lineWidthStr] = styleKey.split('-');
    const lineWidth = parseFloat(lineWidthStr);

    // Set style once for the entire group
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    // Render all boxes with this style
    groupBoxes.forEach(({ box }) => {
      if (drawFunction) {
        drawFunction(ctx, box, color, lineWidth);
      } else {
        drawDefaultBox(ctx, box, color, lineWidth);
      }
    });
  });
};

/**
 * Default optimized box drawing function
 */
export const drawDefaultBox = (
  ctx: CanvasRenderingContext2D,
  box: BoundingBox,
  color: string,
  lineWidth: number
): void => {
  try {
    const [x, y, width, height] = extractCoordinates(box);
    const [clampedX, clampedY, clampedWidth, clampedHeight] = clampToCanvas(
      x,
      y,
      width,
      height,
      ctx.canvas.width,
      ctx.canvas.height,
      lineWidth
    );

    // Optimized corner rendering
    const tenPercent = clampedWidth / 10;
    const ninetyPercent = 9 * tenPercent;

    ctx.beginPath();

    // Left segment
    ctx.moveTo(clampedX + tenPercent, clampedY);
    ctx.lineTo(clampedX, clampedY);
    ctx.lineTo(clampedX, clampedY + clampedHeight);
    ctx.lineTo(clampedX + tenPercent, clampedY + clampedHeight);

    // Right segment
    ctx.moveTo(clampedX + ninetyPercent, clampedY);
    ctx.lineTo(clampedX + clampedWidth, clampedY);
    ctx.lineTo(clampedX + clampedWidth, clampedY + clampedHeight);
    ctx.lineTo(clampedX + ninetyPercent, clampedY + clampedHeight);

    ctx.stroke();
  } catch (error) {
    canvasLogger.warn('Error drawing box:', error);
  }
};

/**
 * Optimized label rendering with background
 */
export const drawOptimizedLabel = (
  ctx: CanvasRenderingContext2D,
  box: any,
  options: {
    font?: string;
    color?: string;
    backgroundColor?: string;
    padding?: number;
  } = {}
): void => {
  if (!box.label) return;

  const {
    font = '16px Arial',
    color = 'white',
    backgroundColor = 'rgba(0,0,0,0.7)',
    padding = 4,
  } = options;

  try {
    const [x, y, , height] = extractCoordinates(box);

    ctx.font = font;
    const textMetrics = ctx.measureText(box.label);
    const textHeight = 16; // Approximate height for 16px font

    // Draw background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(
      x,
      y - textHeight - padding,
      textMetrics.width + padding * 2,
      textHeight + padding * 2
    );

    // Draw text
    ctx.fillStyle = color;
    ctx.fillText(box.label, x + padding, y - padding);
  } catch (error) {
    canvasLogger.warn('Error drawing label:', error);
  }
};

/**
 * Efficient canvas resizing with proper scaling
 */
export const resizeCanvasWithScaling = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  devicePixelRatio: number = window.devicePixelRatio || 1
): void => {
  // Set actual size in memory (scaled to account for pixel density)
  canvas.width = width * devicePixelRatio;
  canvas.height = height * devicePixelRatio;

  // Scale the canvas back down using CSS
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  // Scale the drawing context so everything draws at the correct size
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.scale(devicePixelRatio, devicePixelRatio);
  }
};

/**
 * Check if a point is visible in the current viewport
 */
export const isPointInViewport = (
  x: number,
  y: number,
  canvas: HTMLCanvasElement
): boolean => {
  return x >= 0 && y >= 0 && x <= canvas.width && y <= canvas.height;
};

/**
 * Cull boxes that are not visible in the current viewport
 */
export const cullInvisibleBoxes = (
  boxes: BoundingBox[],
  canvas: HTMLCanvasElement
): BoundingBox[] => {
  return boxes.filter(box => {
    try {
      const [x, y, width, height] = extractCoordinates(box);

      // Check if box intersects with canvas
      return !(
        x + width < 0 ||
        y + height < 0 ||
        x > canvas.width ||
        y > canvas.height
      );
    } catch {
      return false; // Exclude invalid boxes
    }
  });
};

/**
 * Debounced canvas operation utility
 */
export const createDebouncedCanvasOperation = (
  operation: () => void,
  delay: number = 16 // ~60fps
): (() => void) => {
  let timeoutId: number | null = null;

  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      operation();
      timeoutId = null;
    }, delay);
  };
};
