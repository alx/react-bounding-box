// Type definitions for React Bounding Box component

export interface BoundingBoxCoord {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BoundingBoxMinMax {
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
}

export interface BoundingBoxWithLabel {
  coord: BoundingBoxCoord | number[];
  label?: string;
}

export type BoundingBox = 
  | number[] 
  | BoundingBoxCoord 
  | BoundingBoxMinMax 
  | BoundingBoxWithLabel;

export interface SegmentationMask {
  width: number;
  height: number;
  data: number[];
}

export interface ColorScheme {
  normal: string;
  selected: string;
  unselected: string;
}

export interface BoundingBoxOptions {
  colors: ColorScheme;
  style: React.CSSProperties;
  styleSegmentation?: React.CSSProperties;
  base64Image?: boolean;
}

export interface BoundingBoxProps {
  image: string;
  boxes?: BoundingBox[];
  options?: Partial<BoundingBoxOptions>;
  pixelSegmentation?: number[];
  segmentationJsonUrl?: string;
  segmentationMasks?: SegmentationMask[];
  segmentationColors?: string[];
  segmentationTransparency?: number;
  separateSegmentation?: boolean;
  selectedIndex?: number;
  className?: string;
  onSelected?: (index: number) => void;
  drawBox?: (canvas: HTMLCanvasElement, box: BoundingBox, color: string, lineWidth: number) => void;
  drawLabel?: (canvas: HTMLCanvasElement, box: BoundingBoxWithLabel) => void;
}

// Hook-specific types
export interface UseCanvasConfig {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

export interface UseCanvasReturn {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  dimensions: { width: number; height: number };
  context: CanvasRenderingContext2D | null;
  resizeCanvas: (width: number, height: number) => void;
  clearCanvas: () => void;
}

export interface UseImageLoaderReturn {
  loadImage: (src: string) => Promise<HTMLImageElement>;
  loadingState: Record<string, 'loading' | 'loaded' | 'error'>;
  imageCache: Map<string, HTMLImageElement>;
}

export interface UseMouseInteractionConfig {
  boxes: BoundingBox[];
  onSelected?: (index: number) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export interface UseMouseInteractionReturn {
  selectedIndex: number;
  hoveredIndex: number;
  handleMouseMove: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  handleMouseOut: () => void;
  selectBox: (index: number) => void;
}

export interface UseSegmentationConfig {
  segmentationData?: number[];
  segmentationMasks?: SegmentationMask[];
  colors?: string[];
  transparency?: number;
  separateCanvas?: boolean;
}

export interface UseSegmentationReturn {
  segmentationCanvasRef: React.RefObject<HTMLCanvasElement>;
  segmentColors: Map<number, [number, number, number]>;
  renderSegmentation: (canvasRef: React.RefObject<HTMLCanvasElement>) => void;
  generateSegmentColor: (classIndex: number) => [number, number, number];
}

export interface UseBoundingBoxConfig {
  image: string;
  boxes: BoundingBox[];
  options?: Partial<BoundingBoxOptions>;
  segmentation?: UseSegmentationConfig;
  onSelection?: (index: number, box: BoundingBox) => void;
}

export interface UseBoundingBoxReturn {
  mainCanvasRef: React.RefObject<HTMLCanvasElement>;
  segmentationCanvasRef: React.RefObject<HTMLCanvasElement>;
  selectedIndex: number;
  hoveredIndex: number;
  isLoading: boolean;
  error: string | null;
  selectBox: (index: number) => void;
  renderBoxes: () => void;
  renderSegmentation: () => void;
}

// Utility types
export type CoordinateTransform = (
  coord: number[] | BoundingBoxCoord | BoundingBoxMinMax
) => [number, number, number, number];

export type ColorGenerator = (classIndex: number) => [number, number, number];

export type CanvasDrawFunction = (
  ctx: CanvasRenderingContext2D,
  box: BoundingBox,
  color: string,
  lineWidth: number
) => void;

export type LabelDrawFunction = (
  ctx: CanvasRenderingContext2D,
  box: BoundingBoxWithLabel
) => void;