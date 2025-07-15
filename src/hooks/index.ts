// Export all hooks for tree-shaking and modular imports
export { useCanvas } from './useCanvas';
export { useImageLoader } from './useImageLoader';
export { useMouseInteraction } from './useMouseInteraction';
export { useSegmentation } from './useSegmentation';
export { useBoundingBox } from './useBoundingBox';

// Re-export types for convenience
export type {
  UseCanvasConfig,
  UseCanvasReturn,
  UseImageLoaderReturn,
  UseMouseInteractionConfig,
  UseMouseInteractionReturn,
  UseSegmentationConfig,
  UseSegmentationReturn,
  UseBoundingBoxConfig,
  UseBoundingBoxReturn
} from '@/types';