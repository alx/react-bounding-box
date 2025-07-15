import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BoundingBox } from './index';
import type { BoundingBoxProps } from '@/types';

// Mock HTMLCanvasElement methods
beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    clearRect: jest.fn(),
    drawImage: jest.fn(),
    getImageData: jest.fn(() => ({
      data: new Uint8ClampedArray(400), // 10x10 image
      width: 10,
      height: 10
    })),
    putImageData: jest.fn(),
    strokeStyle: '',
    lineWidth: 1,
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    fillStyle: '',
    font: '',
    fillText: jest.fn(),
    measureText: jest.fn(() => ({ width: 50 })),
    fillRect: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
    scale: jest.fn()
  })) as any;
  
  // Mock Image constructor
  (global as any).Image = class {
    constructor() {
      setTimeout(() => {
        if (this.onload) this.onload();
      }, 100);
    }
    addEventListener = jest.fn();
    removeEventListener = jest.fn();
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    src = '';
    width = 100;
    height = 100;
  };
});

describe('BoundingBox Component', () => {
  const defaultProps: BoundingBoxProps = {
    image: 'test-image.jpg',
    boxes: [
      [10, 10, 50, 50],
      [70, 70, 40, 40]
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<BoundingBox {...defaultProps} />);
      expect(screen.getByRole('img', { name: /image with bounding boxes/i })).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(
        <BoundingBox {...defaultProps} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('renders separate segmentation canvas when enabled', () => {
      render(
        <BoundingBox
          {...defaultProps}
          separateSegmentation={true}
          pixelSegmentation={[1, 2, 3, 4]}
        />
      );
      
      expect(screen.getByRole('img', { name: /segmentation overlay/i })).toBeInTheDocument();
    });

    it('shows loading state initially', () => {
      render(<BoundingBox {...defaultProps} />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('displays error message when image fails to load', async () => {
      // Mock failed image load
      (global as any).Image = class {
        constructor() {
          setTimeout(() => {
            if (this.onerror) this.onerror();
          }, 100);
        }
        addEventListener = jest.fn();
        removeEventListener = jest.fn();
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        src = '';
      };

      render(<BoundingBox {...defaultProps} />);
      
      await waitFor(() => {
        expect(screen.getByText(/error loading image/i)).toBeInTheDocument();
      });
    });
  });

  describe('Box Interactions', () => {
    it('calls onSelected when mouse moves over canvas', async () => {
      const onSelected = jest.fn();
      render(<BoundingBox {...defaultProps} onSelected={onSelected} />);
      
      const canvas = screen.getByRole('img', { name: /image with bounding boxes/i });
      
      // Wait for image to load
      await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      });

      fireEvent.mouseMove(canvas, { clientX: 35, clientY: 35 });
      
      await waitFor(() => {
        expect(onSelected).toHaveBeenCalledWith(0);
      });
    });

    it('calls onSelected with -1 when mouse leaves canvas', async () => {
      const onSelected = jest.fn();
      render(<BoundingBox {...defaultProps} onSelected={onSelected} />);
      
      const canvas = screen.getByRole('img', { name: /image with bounding boxes/i });
      
      await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      });

      fireEvent.mouseOut(canvas);
      
      expect(onSelected).toHaveBeenCalledWith(-1);
    });

    it('handles click events on canvas', async () => {
      const onSelected = jest.fn();
      render(<BoundingBox {...defaultProps} onSelected={onSelected} />);
      
      const canvas = screen.getByRole('img', { name: /image with bounding boxes/i });
      
      await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      });

      fireEvent.click(canvas, { clientX: 35, clientY: 35 });
      
      await waitFor(() => {
        expect(onSelected).toHaveBeenCalled();
      });
    });

    it('respects external selectedIndex prop', async () => {
      const { rerender } = render(<BoundingBox {...defaultProps} selectedIndex={0} />);
      
      await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      });

      // Change selectedIndex
      rerender(<BoundingBox {...defaultProps} selectedIndex={1} />);
      
      // Component should sync with external state
      // This would be tested through the hook's selectBox function
    });
  });

  describe('Box Formats', () => {
    it('handles array format boxes', () => {
      const boxes = [[10, 10, 50, 50], [70, 70, 40, 40]];
      render(<BoundingBox {...defaultProps} boxes={boxes} />);
      
      expect(screen.getByRole('img', { name: /image with bounding boxes/i })).toBeInTheDocument();
    });

    it('handles min/max coordinate format', () => {
      const boxes = [
        { xmin: 10, ymin: 10, xmax: 60, ymax: 60 },
        { xmin: 70, ymin: 70, xmax: 110, ymax: 110 }
      ];
      render(<BoundingBox {...defaultProps} boxes={boxes} />);
      
      expect(screen.getByRole('img', { name: /image with bounding boxes/i })).toBeInTheDocument();
    });

    it('handles boxes with labels', () => {
      const boxes = [
        { coord: [10, 10, 50, 50], label: 'Person' },
        { coord: [70, 70, 40, 40], label: 'Car' }
      ];
      render(<BoundingBox {...defaultProps} boxes={boxes} />);
      
      expect(screen.getByRole('img', { name: /image with bounding boxes/i })).toBeInTheDocument();
    });
  });

  describe('Segmentation', () => {
    it('handles pixel segmentation data', () => {
      const segmentationData = Array.from({ length: 100 }, (_, i) => i % 5);
      
      render(
        <BoundingBox
          {...defaultProps}
          pixelSegmentation={segmentationData}
        />
      );
      
      expect(screen.getByRole('img', { name: /image with bounding boxes/i })).toBeInTheDocument();
    });

    it('loads segmentation from JSON URL', async () => {
      // Mock fetch
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({
            body: {
              predictions: [{
                vals: [1, 2, 3, 4, 5]
              }]
            }
          })
        })
      ) as jest.Mock;

      render(
        <BoundingBox
          {...defaultProps}
          segmentationJsonUrl="/test-segmentation.json"
        />
      );
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/test-segmentation.json');
      });
    });

    it('handles segmentation masks', () => {
      const masks = [
        { width: 10, height: 10, data: Array.from({ length: 100 }, () => 1) }
      ];
      const boxes = [{ xmin: 10, ymin: 10, xmax: 20, ymax: 20 }];
      
      render(
        <BoundingBox
          image={defaultProps.image}
          boxes={boxes}
          segmentationMasks={masks}
          separateSegmentation={true}
        />
      );
      
      expect(screen.getByRole('img', { name: /segmentation overlay/i })).toBeInTheDocument();
    });
  });

  describe('Options and Styling', () => {
    it('applies custom colors', () => {
      const customOptions = {
        colors: {
          normal: 'red',
          selected: 'green',
          unselected: 'blue'
        }
      };
      
      render(<BoundingBox {...defaultProps} options={customOptions} />);
      
      expect(screen.getByRole('img', { name: /image with bounding boxes/i })).toBeInTheDocument();
    });

    it('applies custom styles', () => {
      const customOptions = {
        style: { maxWidth: '500px', border: '1px solid red' }
      };
      
      render(<BoundingBox {...defaultProps} options={customOptions} />);
      
      const canvas = screen.getByRole('img', { name: /image with bounding boxes/i });
      expect(canvas).toHaveStyle({ maxWidth: '500px' });
    });

    it('handles base64 images', () => {
      const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
      
      render(
        <BoundingBox
          image={base64Image}
          boxes={defaultProps.boxes}
          options={{ base64Image: true }}
        />
      );
      
      expect(screen.getByRole('img', { name: /image with bounding boxes/i })).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('handles large number of boxes efficiently', async () => {
      const largeBoundingBoxes = Array.from({ length: 1000 }, (_, i) => [
        i % 100 * 10, Math.floor(i / 100) * 10, 50, 50
      ]);
      
      const start = performance.now();
      render(<BoundingBox {...defaultProps} boxes={largeBoundingBoxes} />);
      const end = performance.now();
      
      expect(end - start).toBeLessThan(100); // Should render in under 100ms
    });

    it('does not cause memory leaks with frequent re-renders', async () => {
      const { rerender } = render(<BoundingBox {...defaultProps} />);
      
      // Simulate frequent updates
      for (let i = 0; i < 100; i++) {
        rerender(
          <BoundingBox
            {...defaultProps}
            boxes={[[i, i, 50, 50]]}
          />
        );
      }
      
      // Should complete without issues
      expect(screen.getByRole('img', { name: /image with bounding boxes/i })).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('handles invalid box coordinates gracefully', () => {
      const invalidBoxes = [
        [NaN, 10, 50, 50],
        [10, NaN, 50, 50],
        null,
        undefined,
        'invalid'
      ] as any;
      
      render(<BoundingBox {...defaultProps} boxes={invalidBoxes} />);
      
      // Should not crash
      expect(screen.getByRole('img', { name: /image with bounding boxes/i })).toBeInTheDocument();
    });

    it('handles missing required props gracefully', () => {
      // @ts-expect-error Testing invalid props
      render(<BoundingBox />);
      
      // Should render with error or default state
      expect(screen.getByText(/error loading image/i)).toBeInTheDocument();
    });
  });
});