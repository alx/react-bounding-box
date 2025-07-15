import type { BoundingBox, BoundingBoxCoord, BoundingBoxMinMax, CoordinateTransform } from '@/types';

/**
 * Normalizes different bounding box coordinate formats to [x, y, width, height]
 */
export const normalizeCoordinates: CoordinateTransform = (coord) => {
  // Handle array format [x, y, width, height]
  if (Array.isArray(coord)) {
    return coord as [number, number, number, number];
  }

  // Handle min/max format {xmin, ymin, xmax, ymax}
  if ('xmin' in coord && 'ymin' in coord && 'xmax' in coord && 'ymax' in coord) {
    const minMaxCoord = coord as BoundingBoxMinMax;
    return [
      Math.min(minMaxCoord.xmin, minMaxCoord.xmax),
      Math.min(minMaxCoord.ymin, minMaxCoord.ymax),
      Math.abs(minMaxCoord.xmax - minMaxCoord.xmin),
      Math.abs(minMaxCoord.ymax - minMaxCoord.ymin)
    ];
  }

  // Handle coordinate object format {x, y, width, height}
  if ('x' in coord && 'y' in coord && 'width' in coord && 'height' in coord) {
    const coordObj = coord as BoundingBoxCoord;
    return [coordObj.x, coordObj.y, coordObj.width, coordObj.height];
  }

  throw new Error('Invalid coordinate format');
};

/**
 * Extracts coordinates from a bounding box, handling the coord wrapper
 */
export const extractCoordinates = (box: BoundingBox): [number, number, number, number] => {
  if (!box || typeof box === 'undefined') {
    throw new Error('Invalid bounding box');
  }

  // Handle box with coord property
  if (typeof box === 'object' && 'coord' in box && box.coord) {
    return normalizeCoordinates(box.coord);
  }

  // Handle direct coordinate formats
  return normalizeCoordinates(box as number[] | BoundingBoxCoord | BoundingBoxMinMax);
};

/**
 * Checks if a point is inside a bounding box
 */
export const isPointInBox = (
  x: number, 
  y: number, 
  box: BoundingBox
): boolean => {
  try {
    const [bx, by, bw, bh] = extractCoordinates(box);
    return x >= bx && x <= bx + bw && y >= by && y <= by + bh;
  } catch {
    return false;
  }
};

/**
 * Scales coordinates based on canvas scaling factors
 */
export const scaleCoordinates = (
  clientX: number,
  clientY: number,
  canvasRect: DOMRect,
  canvasWidth: number,
  canvasHeight: number
): [number, number] => {
  const scaleX = canvasWidth / canvasRect.width;
  const scaleY = canvasHeight / canvasRect.height;
  
  const x = (clientX - canvasRect.left) * scaleX;
  const y = (clientY - canvasRect.top) * scaleY;
  
  return [x, y];
};

/**
 * Clamps coordinates to canvas bounds
 */
export const clampToCanvas = (
  x: number,
  y: number,
  width: number,
  height: number,
  canvasWidth: number,
  canvasHeight: number,
  lineWidth: number = 0
): [number, number, number, number] => {
  const minX = Math.max(lineWidth / 2, 0);
  const minY = Math.max(lineWidth / 2, 0);
  const maxX = canvasWidth - lineWidth;
  const maxY = canvasHeight - lineWidth;

  const clampedX = Math.max(minX, Math.min(x, maxX));
  const clampedY = Math.max(minY, Math.min(y, maxY));
  
  const clampedWidth = Math.min(width, maxX - clampedX);
  const clampedHeight = Math.min(height, maxY - clampedY);

  return [clampedX, clampedY, clampedWidth, clampedHeight];
};

/**
 * Finds the smallest bounding box containing a point
 */
export const findSmallestContainingBox = (
  x: number,
  y: number,
  boxes: BoundingBox[]
): { index: number; box: BoundingBox } | null => {
  let smallestBox: { index: number; box: BoundingBox; area: number } | null = null;

  boxes.forEach((box, index) => {
    if (isPointInBox(x, y, box)) {
      try {
        const [, , width, height] = extractCoordinates(box);
        const area = width * height;
        
        if (!smallestBox || area < smallestBox.area) {
          smallestBox = { index, box, area };
        }
      } catch {
        // Skip invalid boxes
      }
    }
  });

  return smallestBox ? { index: smallestBox.index, box: smallestBox.box } : null;
};

/**
 * Validates bounding box coordinates
 */
export const validateBoundingBox = (box: BoundingBox): boolean => {
  try {
    const [x, y, width, height] = extractCoordinates(box);
    return (
      typeof x === 'number' && 
      typeof y === 'number' && 
      typeof width === 'number' && 
      typeof height === 'number' &&
      !isNaN(x) && !isNaN(y) && !isNaN(width) && !isNaN(height) &&
      width >= 0 && height >= 0
    );
  } catch {
    return false;
  }
};