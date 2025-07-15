# React Bounding Box - Modernization Strategy

## Executive Summary

This document outlines a comprehensive modernization strategy for the React Bounding Box component library, focusing on architectural improvements, performance optimization, and developer experience enhancements while maintaining backward compatibility.

## Current State Analysis

### ✅ Strengths

- **Modern Build System**: Already uses Webpack 5, Babel 7, Jest 29
- **Clean Codebase**: Zero security vulnerabilities
- **Good Documentation**: Comprehensive API and usage documentation
- **Modern React**: Already updated to React 18+ with new JSX transform
- **Quality Tooling**: ESLint, Prettier, Husky pre-commit hooks
- **CI/CD Pipeline**: GitHub Actions with automated testing

### ⚠️ Technical Debt & Modernization Opportunities

#### 1. **Legacy React Patterns**

```javascript
// Current: Deprecated lifecycle method
componentWillReceiveProps(nextProps) {
  // Component logic
}

// Target: Modern React hooks
useEffect(() => {
  // Component logic
}, [dependency]);
```

#### 2. **Class Component Architecture**

- Single 565-line class component
- Mixed concerns and responsibilities
- Limited reusability and testability

#### 3. **Dependency Updates Available**

- React 18.3.1 → 19.1.0 (React 19 available)
- ESLint 8.57.1 → 9.31.0 (Major version upgrade)
- Testing Library React 14.3.1 → 16.3.0
- Babel Loader 9.2.1 → 10.0.0
- Seedrandom 2.4.4 → 3.0.5

## Modernization Architecture

### Phase 1: Component Architecture Redesign

#### 1.1 Hook-Based Architecture

```javascript
// New modular hook structure
const useBoundingBox = options => {
  const canvasRef = useRef(null);
  const segmentationRef = useRef(null);

  const { renderBoxes, handleSelection, segmentationManager } =
    useBoundingBoxCore(options);

  return {
    canvasRef,
    segmentationRef,
    renderBoxes,
    handleSelection,
  };
};
```

#### 1.2 Modular Component Structure

```
src/
├── components/
│   ├── BoundingBox/
│   │   ├── index.js                 # Main component (hooks-based)
│   │   ├── BoundingBox.module.css   # Scoped styles
│   │   └── BoundingBox.test.js      # Component tests
│   └── Canvas/
│       ├── BaseCanvas.js            # Reusable canvas component
│       ├── SegmentationCanvas.js    # Segmentation-specific canvas
│       └── InteractiveCanvas.js     # Mouse interaction wrapper
├── hooks/
│   ├── useBoundingBox.js           # Main hook
│   ├── useCanvas.js                # Canvas management
│   ├── useSegmentation.js          # Segmentation logic
│   ├── useMouseInteraction.js      # Mouse event handling
│   └── useImageLoader.js           # Image loading and caching
├── utils/
│   ├── coordinateUtils.js          # Coordinate transformations
│   ├── colorUtils.js               # Color generation and management
│   ├── segmentationUtils.js        # Segmentation processing
│   └── canvasUtils.js              # Canvas drawing utilities
├── types/
│   └── index.d.ts                  # TypeScript definitions
└── constants/
    └── defaults.js                 # Default configurations
```

#### 1.3 Modern React Patterns

**Custom Hooks for Reusability**:

```javascript
// hooks/useCanvas.js
export const useCanvas = config => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const resizeCanvas = useCallback((width, height) => {
    if (canvasRef.current) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      setDimensions({ width, height });
    }
  }, []);

  return { canvasRef, dimensions, resizeCanvas };
};

// hooks/useSegmentation.js
export const useSegmentation = (segmentationData, colors) => {
  const [segmentColors, setSegmentColors] = useState(new Map());

  const generateSegmentColor = useMemo(() => {
    return createColorGenerator(colors);
  }, [colors]);

  const renderSegmentation = useCallback(
    (canvas, data) => {
      // Optimized segmentation rendering
    },
    [generateSegmentColor]
  );

  return { renderSegmentation, segmentColors };
};
```

**Component Composition**:

```javascript
// components/BoundingBox/index.js
export const BoundingBox = ({
  image,
  boxes,
  segmentation,
  options,
  onBoxSelect,
}) => {
  const canvasConfig = useCanvas(options.canvas);
  const segmentationConfig = useSegmentation(segmentation, options.colors);
  const interactionConfig = useMouseInteraction(boxes, onBoxSelect);

  return (
    <div className="bounding-box-container">
      <InteractiveCanvas
        ref={canvasConfig.canvasRef}
        image={image}
        boxes={boxes}
        onMouseMove={interactionConfig.handleMouseMove}
        onMouseOut={interactionConfig.handleMouseOut}
        style={options.style}
      />
      {options.separateSegmentation && (
        <SegmentationCanvas
          ref={segmentationConfig.canvasRef}
          segmentation={segmentation}
          colors={options.segmentationColors}
          style={options.styleSegmentation}
        />
      )}
    </div>
  );
};
```

### Phase 2: Performance Optimization Strategy

#### 2.1 Canvas Performance Enhancements

**Render Optimization**:

```javascript
// utils/canvasUtils.js
export class CanvasRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.renderQueue = [];
    this.animationFrame = null;
  }

  queueRender(renderFn) {
    this.renderQueue.push(renderFn);
    if (!this.animationFrame) {
      this.animationFrame = requestAnimationFrame(() => {
        this.flushRenderQueue();
      });
    }
  }

  flushRenderQueue() {
    this.renderQueue.forEach(fn => fn(this.ctx));
    this.renderQueue = [];
    this.animationFrame = null;
  }
}

// Optimized box rendering with batching
export const useBatchedRenderer = canvasRef => {
  const rendererRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      rendererRef.current = new CanvasRenderer(canvasRef.current);
    }
  }, [canvasRef]);

  const queueBoxRender = useCallback((boxes, colors) => {
    rendererRef.current?.queueRender(ctx => {
      renderBoxesBatched(ctx, boxes, colors);
    });
  }, []);

  return { queueBoxRender };
};
```

**Memory Management**:

```javascript
// hooks/useImageLoader.js
export const useImageLoader = () => {
  const imageCache = useRef(new Map());
  const [loadingState, setLoadingState] = useState({});

  const loadImage = useCallback(async src => {
    if (imageCache.current.has(src)) {
      return imageCache.current.get(src);
    }

    setLoadingState(prev => ({ ...prev, [src]: 'loading' }));

    try {
      const image = await loadImageAsync(src);
      imageCache.current.set(src, image);
      setLoadingState(prev => ({ ...prev, [src]: 'loaded' }));
      return image;
    } catch (error) {
      setLoadingState(prev => ({ ...prev, [src]: 'error' }));
      throw error;
    }
  }, []);

  // Cleanup cache on unmount
  useEffect(() => {
    return () => {
      imageCache.current.clear();
    };
  }, []);

  return { loadImage, loadingState };
};
```

#### 2.2 Segmentation Performance

**Worker-Based Processing**:

```javascript
// workers/segmentationWorker.js
self.onmessage = function (e) {
  const { segmentationData, colors, imageData } = e.data;

  const processedData = processSegmentationData(
    segmentationData,
    colors,
    imageData
  );

  self.postMessage({ processedData });
};

// hooks/useSegmentationWorker.js
export const useSegmentationWorker = () => {
  const workerRef = useRef(null);

  useEffect(() => {
    workerRef.current = new Worker('/workers/segmentationWorker.js');
    return () => workerRef.current?.terminate();
  }, []);

  const processSegmentation = useCallback((data, colors, imageData) => {
    return new Promise(resolve => {
      workerRef.current.onmessage = e => {
        resolve(e.data.processedData);
      };
      workerRef.current.postMessage({
        segmentationData: data,
        colors,
        imageData,
      });
    });
  }, []);

  return { processSegmentation };
};
```

### Phase 3: TypeScript Integration

#### 3.1 Type Definitions

```typescript
// types/index.d.ts
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

export interface BoundingBoxOptions {
  colors: {
    normal: string;
    selected: string;
    unselected: string;
  };
  style: React.CSSProperties;
  styleSegmentation?: React.CSSProperties;
  base64Image?: boolean;
}

export interface BoundingBoxProps {
  image: string;
  boxes?: BoundingBox[];
  options?: Partial<BoundingBoxOptions>;
  segmentation?: number[];
  segmentationJsonUrl?: string;
  segmentationMasks?: SegmentationMask[];
  segmentationColors?: string[];
  segmentationTransparency?: number;
  separateSegmentation?: boolean;
  selectedIndex?: number;
  className?: string;
  onSelected?: (index: number) => void;
  onBoxRender?: (
    canvas: HTMLCanvasElement,
    box: BoundingBox,
    color: string,
    lineWidth: number
  ) => void;
  onLabelRender?: (
    canvas: HTMLCanvasElement,
    box: BoundingBoxWithLabel
  ) => void;
}
```

#### 3.2 Generic Hook Types

```typescript
// hooks/useBoundingBox.ts
export interface UseBoundingBoxConfig<T extends BoundingBox = BoundingBox> {
  boxes: T[];
  onSelection?: (index: number, box: T) => void;
  renderOptions?: BoundingBoxOptions;
}

export interface UseBoundingBoxReturn<T extends BoundingBox = BoundingBox> {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  selectedIndex: number;
  hoveredIndex: number;
  selectBox: (index: number) => void;
  renderBoxes: () => void;
}

export function useBoundingBox<T extends BoundingBox = BoundingBox>(
  config: UseBoundingBoxConfig<T>
): UseBoundingBoxReturn<T> {
  // Implementation
}
```

### Phase 4: Testing & Quality Improvements

#### 4.1 Enhanced Test Coverage

```javascript
// __tests__/BoundingBox.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BoundingBox } from '../BoundingBox';

describe('BoundingBox Component', () => {
  const mockProps = {
    image: 'test-image.jpg',
    boxes: [
      [0, 0, 100, 100],
      [200, 200, 150, 150],
    ],
    onSelected: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders canvas with correct dimensions', async () => {
      render(<BoundingBox {...mockProps} />);

      await waitFor(() => {
        const canvas = screen.getByRole('img'); // Canvas with image
        expect(canvas).toBeInTheDocument();
      });
    });

    it('renders separate segmentation canvas when enabled', () => {
      render(
        <BoundingBox
          {...mockProps}
          separateSegmentation={true}
          segmentation={[1, 2, 3, 4]}
        />
      );

      const canvases = screen.getAllByRole('img');
      expect(canvases).toHaveLength(2);
    });
  });

  describe('Interactions', () => {
    it('calls onSelected when box is clicked', async () => {
      render(<BoundingBox {...mockProps} />);

      const canvas = screen.getByRole('img');
      fireEvent.mouseMove(canvas, { clientX: 50, clientY: 50 });

      await waitFor(() => {
        expect(mockProps.onSelected).toHaveBeenCalledWith(0);
      });
    });
  });

  describe('Performance', () => {
    it('handles large number of boxes efficiently', () => {
      const largeBoundingBoxes = Array.from({ length: 1000 }, (_, i) => [
        i * 10,
        i * 10,
        50,
        50,
      ]);

      const start = performance.now();
      render(<BoundingBox {...mockProps} boxes={largeBoundingBoxes} />);
      const end = performance.now();

      expect(end - start).toBeLessThan(100); // Should render in under 100ms
    });
  });
});

// __tests__/hooks/useBoundingBox.test.js
import { renderHook, act } from '@testing-library/react';
import { useBoundingBox } from '../../hooks/useBoundingBox';

describe('useBoundingBox Hook', () => {
  const defaultConfig = {
    boxes: [[0, 0, 100, 100]],
    onSelection: jest.fn(),
  };

  it('initializes with correct default state', () => {
    const { result } = renderHook(() => useBoundingBox(defaultConfig));

    expect(result.current.selectedIndex).toBe(-1);
    expect(result.current.hoveredIndex).toBe(-1);
    expect(result.current.canvasRef.current).toBeNull();
  });

  it('updates selection correctly', () => {
    const { result } = renderHook(() => useBoundingBox(defaultConfig));

    act(() => {
      result.current.selectBox(0);
    });

    expect(result.current.selectedIndex).toBe(0);
    expect(defaultConfig.onSelection).toHaveBeenCalledWith(0, [0, 0, 100, 100]);
  });
});
```

#### 4.2 Visual Regression Testing

```javascript
// __tests__/visual/BoundingBox.visual.test.js
import { render } from '@testing-library/react';
import { generateImage } from '@storybook/addon-storyshots-puppeteer';

describe('BoundingBox Visual Tests', () => {
  it('matches baseline for default boxes', async () => {
    const component = (
      <BoundingBox
        image="test-image.jpg"
        boxes={[
          [0, 0, 100, 100],
          [200, 200, 150, 150],
        ]}
      />
    );

    const image = await generateImage(component);
    expect(image).toMatchImageSnapshot();
  });

  it('matches baseline for segmentation overlay', async () => {
    const component = (
      <BoundingBox
        image="test-image.jpg"
        segmentation={[1, 2, 1, 2, 1, 2]}
        segmentationColors={['#ff0000', '#00ff00']}
      />
    );

    const image = await generateImage(component);
    expect(image).toMatchImageSnapshot();
  });
});
```

### Phase 5: Build System Modernization

#### 5.1 Enhanced Webpack Configuration

```javascript
// webpack.config.js
const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: {
      main: './src/index.js',
      hooks: './src/hooks/index.js', // Separate hooks bundle
      utils: './src/utils/index.js', // Separate utils bundle
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      library: {
        name: 'ReactBoundingBox',
        type: 'umd',
        export: 'default',
      },
      globalObject: 'this',
      clean: true,
    },
    optimization: {
      minimize: isProduction,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                ['@babel/preset-env', { modules: false }],
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript',
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                },
              },
            },
          ],
        },
        {
          test: /\.worker\.js$/,
          loader: 'worker-loader',
          options: {
            filename: '[name].[contenthash].worker.js',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
  };
};
```

#### 5.2 Package.json Updates

```json
{
  "scripts": {
    "build": "webpack --mode=production",
    "build:analyze": "webpack-bundle-analyzer dist/stats.json",
    "build:types": "tsc --emitDeclarationOnly",
    "dev": "webpack serve --mode=development",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:visual": "jest --config jest.visual.config.js",
    "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint src --ext .js,.jsx,.ts,.tsx --fix",
    "type-check": "tsc --noEmit",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "exports": {
    ".": {
      "import": "./dist/main.js",
      "require": "./dist/main.js",
      "types": "./dist/types/index.d.ts"
    },
    "./hooks": {
      "import": "./dist/hooks.js",
      "require": "./dist/hooks.js",
      "types": "./dist/types/hooks/index.d.ts"
    },
    "./utils": {
      "import": "./dist/utils.js",
      "require": "./dist/utils.js",
      "types": "./dist/types/utils/index.d.ts"
    }
  }
}
```

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)

- [ ] Set up TypeScript configuration
- [ ] Create modular directory structure
- [ ] Implement basic hooks (useCanvas, useImageLoader)
- [ ] Migrate core canvas functionality

### Phase 2: Component Refactoring (Weeks 3-4)

- [ ] Convert class component to functional component
- [ ] Implement useBoundingBox hook
- [ ] Add useSegmentation hook
- [ ] Create mouse interaction hook

### Phase 3: Performance & Features (Weeks 5-6)

- [ ] Implement canvas rendering optimizations
- [ ] Add Web Worker for segmentation processing
- [ ] Enhanced error handling and loading states
- [ ] Accessibility improvements

### Phase 4: Testing & Documentation (Weeks 7-8)

- [ ] Comprehensive test suite with hooks testing
- [ ] Visual regression testing setup
- [ ] Performance benchmarking
- [ ] Updated documentation and examples

### Phase 5: Build & Release (Week 9)

- [ ] Enhanced build system with tree shaking
- [ ] Bundle size optimization
- [ ] TypeScript declaration generation
- [ ] Release preparation and migration guide

## Migration Strategy

### Backward Compatibility

- Maintain existing API surface
- Provide gradual migration path
- Comprehensive deprecation warnings
- Extensive migration documentation

### Breaking Changes (v2.0)

1. **Component API**: Hooks-based component structure
2. **TypeScript**: First-class TypeScript support
3. **Bundle Structure**: Modular exports for tree shaking
4. **Minimum Requirements**: React 18+, Node 18+

### Migration Path

```javascript
// v1.x (Current)
import Boundingbox from 'react-bounding-box';

// v2.x (Modernized)
import { BoundingBox } from 'react-bounding-box';
// or for hooks-only usage
import { useBoundingBox } from 'react-bounding-box/hooks';
```

## Success Metrics

### Performance Targets

- **Bundle Size**: <20KB gzipped (currently ~15KB)
- **Render Time**: <50ms for 100 boxes
- **Memory Usage**: <50MB for large datasets
- **Accessibility**: WCAG 2.1 AA compliance

### Developer Experience

- **TypeScript Coverage**: 100%
- **Test Coverage**: >90%
- **Documentation Coverage**: 100% API coverage
- **Build Time**: <30s for full build

### Quality Gates

- Zero security vulnerabilities
- Zero TypeScript errors
- All visual regression tests pass
- Performance benchmarks within targets

This modernization strategy provides a clear path forward while maintaining the library's core strengths and ensuring long-term maintainability and developer experience.
