import type { BoundingBox, CoordinateTransform } from '@/types';
/**
 * Normalizes different bounding box coordinate formats to [x, y, width, height]
 */
export declare const normalizeCoordinates: CoordinateTransform;
/**
 * Extracts coordinates from a bounding box, handling the coord wrapper
 */
export declare const extractCoordinates: (box: BoundingBox) => [number, number, number, number];
/**
 * Checks if a point is inside a bounding box
 */
export declare const isPointInBox: (x: number, y: number, box: BoundingBox) => boolean;
/**
 * Scales coordinates based on canvas scaling factors
 */
export declare const scaleCoordinates: (clientX: number, clientY: number, canvasRect: DOMRect, canvasWidth: number, canvasHeight: number) => [number, number];
/**
 * Clamps coordinates to canvas bounds
 */
export declare const clampToCanvas: (x: number, y: number, width: number, height: number, canvasWidth: number, canvasHeight: number, lineWidth?: number) => [number, number, number, number];
/**
 * Finds the smallest bounding box containing a point
 */
export declare const findSmallestContainingBox: (x: number, y: number, boxes: BoundingBox[]) => {
    index: number;
    box: BoundingBox;
} | null;
/**
 * Validates bounding box coordinates
 */
export declare const validateBoundingBox: (box: BoundingBox) => boolean;
//# sourceMappingURL=coordinateUtils.d.ts.map