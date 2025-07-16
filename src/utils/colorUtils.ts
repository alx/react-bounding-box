import seedrandom from 'seedrandom';
// @ts-ignore - seedrandom has incomplete type definitions
import type { ColorGenerator } from '@/types';
import { COLOR_SEED_BASE } from '@/constants/defaults';

/**
 * Creates a deterministic color generator based on class indices
 */
export const createColorGenerator = (
  customColors?: string[]
): ColorGenerator => {
  return (classIndex: number): [number, number, number] => {
    // Use custom colors if provided
    if (customColors && customColors[classIndex]) {
      return hexToRgb(customColors[classIndex]);
    }

    // Generate deterministic color using seedrandom
    const random = seedrandom(`${COLOR_SEED_BASE}-${classIndex}`);
    return [
      Math.floor(random() * 255),
      Math.floor(random() * 255),
      Math.floor(random() * 255),
    ];
  };
};

/**
 * Converts hex color to RGB tuple
 */
export const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
};

/**
 * Converts RGB tuple to hex string
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, c))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Converts RGB tuple to rgba string
 */
export const rgbToRgba = (
  r: number,
  g: number,
  b: number,
  alpha: number = 1
): string => {
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${alpha})`;
};

/**
 * Adjusts opacity of an existing color string
 */
export const adjustOpacity = (color: string, opacity: number): string => {
  // Handle rgba colors
  const rgbaMatch = color.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
  );
  if (rgbaMatch) {
    const [, r, g, b] = rgbaMatch;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // Handle hex colors
  if (color.startsWith('#')) {
    const [r, g, b] = hexToRgb(color);
    return rgbToRgba(r, g, b, opacity);
  }

  // Fallback: return original color
  return color;
};

/**
 * Blends two RGB colors with specified ratio
 */
export const blendColors = (
  color1: [number, number, number],
  color2: [number, number, number],
  ratio: number = 0.5
): [number, number, number] => {
  const clampedRatio = Math.max(0, Math.min(1, ratio));

  return [
    Math.round(color1[0] * (1 - clampedRatio) + color2[0] * clampedRatio),
    Math.round(color1[1] * (1 - clampedRatio) + color2[1] * clampedRatio),
    Math.round(color1[2] * (1 - clampedRatio) + color2[2] * clampedRatio),
  ];
};

/**
 * Generates a high-contrast color for text on a given background
 */
export const getContrastColor = (
  backgroundColor: [number, number, number]
): [number, number, number] => {
  const [r, g, b] = backgroundColor;

  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return white text for dark backgrounds, black for light backgrounds
  return luminance > 0.5 ? [0, 0, 0] : [255, 255, 255];
};

/**
 * Creates a color palette for segmentation classes
 */
export const createSegmentationPalette = (
  numClasses: number,
  customColors?: string[]
): string[] => {
  const palette: string[] = [];
  const colorGenerator = createColorGenerator(customColors);

  for (let i = 0; i < numClasses; i++) {
    if (customColors && customColors[i]) {
      palette.push(customColors[i]);
    } else {
      const [r, g, b] = colorGenerator(i);
      palette.push(rgbToHex(r, g, b));
    }
  }

  return palette;
};

/**
 * Validates color format (hex, rgb, rgba)
 */
export const isValidColor = (color: string): boolean => {
  // Test hex format
  if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
    return true;
  }

  // Test rgb/rgba format
  if (
    /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)$/.test(color)
  ) {
    return true;
  }

  // Test named colors (basic check)
  const colorNames = [
    'red',
    'green',
    'blue',
    'yellow',
    'orange',
    'purple',
    'pink',
    'cyan',
    'magenta',
    'lime',
    'indigo',
    'violet',
    'brown',
    'gray',
    'black',
    'white',
  ];

  return colorNames.includes(color.toLowerCase());
};
