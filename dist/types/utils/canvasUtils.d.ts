import type { BoundingBox, CanvasDrawFunction } from '@/types';
/**
 * High-performance canvas renderer with batching and optimization
 */
export declare class CanvasRenderer {
    private canvas;
    private ctx;
    private renderQueue;
    private animationFrame;
    private isDirty;
    constructor(canvas: HTMLCanvasElement);
    /**
     * Optimize canvas context for better performance
     */
    private optimizeContext;
    /**
     * Queue a render function to be executed in the next animation frame
     */
    queueRender(renderFn: () => void): void;
    /**
     * Execute all queued render functions
     */
    private flushRenderQueue;
    /**
     * Clear the canvas efficiently
     */
    clear(): void;
    /**
     * Get the rendering context
     */
    getContext(): CanvasRenderingContext2D;
    /**
     * Check if there are pending renders
     */
    isDirtyFlag(): boolean;
    /**
     * Force immediate render of all queued operations
     */
    forceRender(): void;
    /**
     * Cleanup resources
     */
    destroy(): void;
}
/**
 * Optimized batch rendering for multiple bounding boxes
 */
export declare const renderBoxesBatched: (ctx: CanvasRenderingContext2D, boxes: BoundingBox[], colors: string[], lineWidths: number[], drawFunction?: CanvasDrawFunction) => void;
/**
 * Default optimized box drawing function
 */
export declare const drawDefaultBox: (ctx: CanvasRenderingContext2D, box: BoundingBox, color: string, lineWidth: number) => void;
/**
 * Optimized label rendering with background
 */
export declare const drawOptimizedLabel: (ctx: CanvasRenderingContext2D, box: any, options?: {
    font?: string;
    color?: string;
    backgroundColor?: string;
    padding?: number;
}) => void;
/**
 * Efficient canvas resizing with proper scaling
 */
export declare const resizeCanvasWithScaling: (canvas: HTMLCanvasElement, width: number, height: number, devicePixelRatio?: number) => void;
/**
 * Check if a point is visible in the current viewport
 */
export declare const isPointInViewport: (x: number, y: number, canvas: HTMLCanvasElement) => boolean;
/**
 * Cull boxes that are not visible in the current viewport
 */
export declare const cullInvisibleBoxes: (boxes: BoundingBox[], canvas: HTMLCanvasElement) => BoundingBox[];
/**
 * Debounced canvas operation utility
 */
export declare const createDebouncedCanvasOperation: (operation: () => void, delay?: number) => (() => void);
//# sourceMappingURL=canvasUtils.d.ts.map