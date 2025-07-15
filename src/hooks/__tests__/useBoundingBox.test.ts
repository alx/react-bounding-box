import { renderHook, act } from '@testing-library/react';
import { useBoundingBox } from '../useBoundingBox';
import type { UseBoundingBoxConfig } from '@/types';

// Mock the individual hooks
jest.mock('../useCanvas', () => ({
  useCanvas: jest.fn(() => ({
    canvasRef: { current: null },
    dimensions: { width: 0, height: 0 },
    context: null,
    resizeCanvas: jest.fn(),
    clearCanvas: jest.fn()
  }))
}));

jest.mock('../useImageLoader', () => ({
  useImageLoader: jest.fn(() => ({
    loadImage: jest.fn(() => Promise.resolve({
      width: 100,
      height: 100
    })),
    loadingState: {},
    imageCache: new Map()
  }))
}));

jest.mock('../useMouseInteraction', () => ({
  useMouseInteraction: jest.fn(() => ({
    selectedIndex: -1,
    hoveredIndex: -1,
    handleMouseMove: jest.fn(),
    handleMouseOut: jest.fn(),
    handleCanvasClick: jest.fn(),
    selectBox: jest.fn(),
    getCurrentBox: jest.fn(),
    clearSelection: jest.fn()
  }))
}));

jest.mock('../useSegmentation', () => ({
  useSegmentation: jest.fn(() => ({
    segmentationCanvasRef: { current: null },
    segmentColors: new Map(),
    renderSegmentation: jest.fn(),
    generateSegmentColor: jest.fn(),
    loadSegmentationFromUrl: jest.fn(),
    clearSegmentation: jest.fn(),
    getSegmentationStats: jest.fn(),
    isProcessing: false
  }))
}));

describe('useBoundingBox Hook', () => {
  const defaultConfig: UseBoundingBoxConfig = {
    image: 'test-image.jpg',
    boxes: [
      [10, 10, 50, 50],
      [70, 70, 40, 40]
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initialization', () => {
    it('initializes with correct default state', () => {
      const { result } = renderHook(() => useBoundingBox(defaultConfig));
      
      expect(result.current.selectedIndex).toBe(-1);
      expect(result.current.hoveredIndex).toBe(-1);
      expect(result.current.mainCanvasRef).toBeDefined();
      expect(result.current.segmentationCanvasRef).toBeDefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('merges options with defaults correctly', () => {
      const customOptions = {
        colors: {
          normal: 'red',
          selected: 'green',
          unselected: 'blue'
        }
      };

      const { result } = renderHook(() => 
        useBoundingBox({
          ...defaultConfig,
          options: customOptions
        })
      );

      // Hook should initialize without errors
      expect(result.current).toBeDefined();
    });
  });

  describe('Box Selection', () => {
    it('provides selectBox function', () => {
      const { result } = renderHook(() => useBoundingBox(defaultConfig));
      
      expect(result.current.selectBox).toBeInstanceOf(Function);
    });

    it('provides clearSelection function', () => {
      const { result } = renderHook(() => useBoundingBox(defaultConfig));
      
      expect(result.current.clearSelection).toBeInstanceOf(Function);
    });

    it('provides getCurrentBox function', () => {
      const { result } = renderHook(() => useBoundingBox(defaultConfig));
      
      expect(result.current.getCurrentBox).toBeInstanceOf(Function);
    });
  });

  describe('Event Handlers', () => {
    it('provides mouse event handlers', () => {
      const { result } = renderHook(() => useBoundingBox(defaultConfig));
      
      expect(result.current.handleMouseMove).toBeInstanceOf(Function);
      expect(result.current.handleMouseOut).toBeInstanceOf(Function);
      expect(result.current.handleCanvasClick).toBeInstanceOf(Function);
    });
  });

  describe('Rendering Functions', () => {
    it('provides renderBoxes function', () => {
      const { result } = renderHook(() => useBoundingBox(defaultConfig));
      
      expect(result.current.renderBoxes).toBeInstanceOf(Function);
    });

    it('provides renderSegmentation function', () => {
      const { result } = renderHook(() => useBoundingBox(defaultConfig));
      
      expect(result.current.renderSegmentation).toBeInstanceOf(Function);
    });
  });

  describe('Configuration Changes', () => {
    it('handles image changes', () => {
      const { result, rerender } = renderHook(
        ({ image }) => useBoundingBox({ ...defaultConfig, image }),
        { initialProps: { image: 'image1.jpg' } }
      );

      // Change image
      rerender({ image: 'image2.jpg' });

      // Hook should handle the change without errors
      expect(result.current).toBeDefined();
    });

    it('handles boxes changes', () => {
      const { result, rerender } = renderHook(
        ({ boxes }) => useBoundingBox({ ...defaultConfig, boxes }),
        { initialProps: { boxes: [[10, 10, 50, 50]] } }
      );

      // Change boxes
      rerender({ boxes: [[20, 20, 60, 60], [80, 80, 30, 30]] });

      // Hook should handle the change without errors
      expect(result.current).toBeDefined();
    });

    it('handles segmentation configuration changes', () => {
      const { result, rerender } = renderHook(
        ({ segmentation }) => useBoundingBox({ ...defaultConfig, segmentation }),
        { initialProps: { segmentation: {} } }
      );

      // Add segmentation data
      rerender({
        segmentation: {
          segmentationData: [1, 2, 3, 4, 5],
          colors: ['#ff0000', '#00ff00']
        }
      });

      // Hook should handle the change without errors
      expect(result.current).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('handles invalid configuration gracefully', () => {
      const invalidConfig = {
        image: '',
        boxes: null as any
      };

      const { result } = renderHook(() => useBoundingBox(invalidConfig));
      
      // Should not crash
      expect(result.current).toBeDefined();
    });

    it('provides error state', () => {
      const { result } = renderHook(() => useBoundingBox(defaultConfig));
      
      expect(result.current.error).toBeNull();
    });
  });

  describe('Loading State', () => {
    it('provides loading state', () => {
      const { result } = renderHook(() => useBoundingBox(defaultConfig));
      
      expect(typeof result.current.isLoading).toBe('boolean');
    });
  });

  describe('Canvas References', () => {
    it('provides main canvas ref', () => {
      const { result } = renderHook(() => useBoundingBox(defaultConfig));
      
      expect(result.current.mainCanvasRef).toBeDefined();
      expect(result.current.mainCanvasRef).toHaveProperty('current');
    });

    it('provides segmentation canvas ref', () => {
      const { result } = renderHook(() => useBoundingBox(defaultConfig));
      
      expect(result.current.segmentationCanvasRef).toBeDefined();
      expect(result.current.segmentationCanvasRef).toHaveProperty('current');
    });
  });

  describe('Callback Integration', () => {
    it('handles onSelection callback', () => {
      const onSelection = jest.fn();
      
      const { result } = renderHook(() => 
        useBoundingBox({
          ...defaultConfig,
          onSelection
        })
      );

      // Should initialize without calling the callback
      expect(onSelection).not.toHaveBeenCalled();
    });
  });

  describe('Performance', () => {
    it('handles large number of boxes efficiently', () => {
      const largeBoundingBoxes = Array.from({ length: 1000 }, (_, i) => [
        i % 100 * 10, Math.floor(i / 100) * 10, 50, 50
      ]);

      const start = performance.now();
      const { result } = renderHook(() => 
        useBoundingBox({
          ...defaultConfig,
          boxes: largeBoundingBoxes
        })
      );
      const end = performance.now();

      expect(end - start).toBeLessThan(50); // Should initialize quickly
      expect(result.current).toBeDefined();
    });

    it('handles frequent re-renders efficiently', () => {
      const { result, rerender } = renderHook(
        ({ boxes }) => useBoundingBox({ ...defaultConfig, boxes }),
        { initialProps: { boxes: [[10, 10, 50, 50]] } }
      );

      // Simulate frequent updates
      for (let i = 0; i < 100; i++) {
        rerender({ boxes: [[i, i, 50, 50]] });
      }

      // Should complete without performance issues
      expect(result.current).toBeDefined();
    });
  });
});