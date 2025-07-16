// Export all utility functions
export {
  normalizeCoordinates,
  extractCoordinates,
  isPointInBox,
  scaleCoordinates,
  clampToCanvas,
  findSmallestContainingBox,
  validateBoundingBox,
} from './coordinateUtils';

export {
  createColorGenerator,
  hexToRgb,
  rgbToHex,
  rgbToRgba,
  adjustOpacity,
  blendColors,
  getContrastColor,
  createSegmentationPalette,
  isValidColor,
} from './colorUtils';

// Re-export types for convenience
export type {
  CoordinateTransform,
  ColorGenerator,
  CanvasDrawFunction,
  LabelDrawFunction,
} from '@/types';
