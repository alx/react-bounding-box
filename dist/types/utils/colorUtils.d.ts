import type { ColorGenerator } from '@/types';
/**
 * Creates a deterministic color generator based on class indices
 */
export declare const createColorGenerator: (customColors?: string[]) => ColorGenerator;
/**
 * Converts hex color to RGB tuple
 */
export declare const hexToRgb: (hex: string) => [number, number, number];
/**
 * Converts RGB tuple to hex string
 */
export declare const rgbToHex: (r: number, g: number, b: number) => string;
/**
 * Converts RGB tuple to rgba string
 */
export declare const rgbToRgba: (r: number, g: number, b: number, alpha?: number) => string;
/**
 * Adjusts opacity of an existing color string
 */
export declare const adjustOpacity: (color: string, opacity: number) => string;
/**
 * Blends two RGB colors with specified ratio
 */
export declare const blendColors: (color1: [number, number, number], color2: [number, number, number], ratio?: number) => [number, number, number];
/**
 * Generates a high-contrast color for text on a given background
 */
export declare const getContrastColor: (backgroundColor: [number, number, number]) => [number, number, number];
/**
 * Creates a color palette for segmentation classes
 */
export declare const createSegmentationPalette: (numClasses: number, customColors?: string[]) => string[];
/**
 * Validates color format (hex, rgb, rgba)
 */
export declare const isValidColor: (color: string) => boolean;
//# sourceMappingURL=colorUtils.d.ts.map