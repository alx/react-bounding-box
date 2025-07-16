import type { BoundingBoxOptions, ColorScheme } from '@/types';

export const DEFAULT_COLORS: ColorScheme = {
  normal: 'rgba(255,225,255,1)',
  selected: 'rgba(0,225,204,1)',
  unselected: 'rgba(100,100,100,1)',
};

export const DEFAULT_OPTIONS: BoundingBoxOptions = {
  colors: DEFAULT_COLORS,
  style: {
    maxWidth: '100%',
    maxHeight: '90vh',
  },
  styleSegmentation: {
    maxWidth: '100%',
    maxHeight: '90vh',
    pointerEvents: 'none' as const,
  },
  base64Image: false,
};

export const DEFAULT_SEGMENTATION_TRANSPARENCY = 190;

export const DEFAULT_LINE_WIDTHS = {
  small: 2, // canvas width <= 600
  medium: 3, // canvas width 600-1000
  large: 5, // canvas width > 1000
};

export const CANVAS_SIZE_BREAKPOINTS = {
  small: 600,
  large: 1000,
};

export const DEFAULT_FONT_STYLE = '60px Arial';
export const DEFAULT_FONT_COLOR = 'rgba(225,0,0,1)';

// Performance constants
export const RENDER_BATCH_SIZE = 50;
export const SEGMENTATION_WORKER_TIMEOUT = 5000;
export const IMAGE_CACHE_MAX_SIZE = 50;

// Color generation seed
export const COLOR_SEED_BASE = 'react-bounding-box';
