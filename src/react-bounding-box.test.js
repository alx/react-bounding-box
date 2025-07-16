import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Boundingbox from './react-bounding-box'; // eslint-disable-line no-unused-vars

// Mock HTMLCanvasElement methods
const mockCanvas = {
  getContext: jest.fn(() => ({
    drawImage: jest.fn(),
    clearRect: jest.fn(),
    getImageData: jest.fn(() => ({ data: new Array(100).fill(0) })),
    putImageData: jest.fn(),
    strokeStyle: '',
    lineWidth: 0,
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    fillStyle: '',
    font: '',
    fillText: jest.fn(),
  })),
  getBoundingClientRect: jest.fn(() => ({
    left: 0,
    top: 0,
    width: 100,
    height: 100,
  })),
  width: 100,
  height: 100,
  onmousemove: null,
  onmouseout: null,
};

HTMLCanvasElement.prototype.getContext = mockCanvas.getContext;
HTMLCanvasElement.prototype.getBoundingClientRect =
  mockCanvas.getBoundingClientRect;

// Mock canvas width/height setters
Object.defineProperty(HTMLCanvasElement.prototype, 'width', {
  get: () => mockCanvas.width,
  set: value => {
    mockCanvas.width = value;
  },
});

Object.defineProperty(HTMLCanvasElement.prototype, 'height', {
  get: () => mockCanvas.height,
  set: value => {
    mockCanvas.height = value;
  },
});

// Mock Image constructor
global.Image = class {
  constructor() {
    setTimeout(() => {
      this.onload && this.onload();
    }, 0);
  }
  set src(value) {
    this._src = value;
  }
  get src() {
    return this._src;
  }
  get width() {
    return 100;
  }
  get height() {
    return 100;
  }
};

// Mock fetch for segmentation JSON
global.fetch = jest.fn();

describe('Boundingbox Component', () => {
  const defaultProps = {
    image: 'test-image.jpg',
    boxes: [
      [10, 10, 50, 50],
      [60, 60, 40, 40],
    ],
    onSelected: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders canvas element', () => {
    render(<Boundingbox {...defaultProps} />);
    const canvas = document.querySelector('.boundingBoxCanvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas.tagName).toBe('CANVAS');
  });

  test('renders with default props', () => {
    render(<Boundingbox image="test.jpg" />);
    const canvas = document.querySelector('.boundingBoxCanvas');
    expect(canvas).toBeInTheDocument();
  });

  test('handles array-format boxes', async () => {
    const { container } = render(<Boundingbox {...defaultProps} />);

    await waitFor(() => {
      const canvas = container.querySelector('.boundingBoxCanvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  test('handles object-format boxes with coord property', async () => {
    const objectBoxes = [
      { coord: [10, 10, 50, 50], label: 'Box 1' },
      { coord: [60, 60, 40, 40], label: 'Box 2' },
    ];

    render(<Boundingbox {...defaultProps} boxes={objectBoxes} />);

    await waitFor(() => {
      const canvas = document.querySelector('.boundingBoxCanvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  test('handles object-format boxes with xmin/xmax/ymin/ymax', async () => {
    const minMaxBoxes = [
      { xmin: 10, ymin: 10, xmax: 60, ymax: 60 },
      { xmin: 70, ymin: 70, xmax: 110, ymax: 110 },
    ];

    render(<Boundingbox {...defaultProps} boxes={minMaxBoxes} />);

    await waitFor(() => {
      const canvas = document.querySelector('.boundingBoxCanvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  test('calls onSelected when mouse moves over canvas', async () => {
    const onSelected = jest.fn();
    render(<Boundingbox {...defaultProps} onSelected={onSelected} />);

    const canvas = document.querySelector('.boundingBoxCanvas');

    await waitFor(() => {
      expect(canvas).toBeInTheDocument();
    });

    // Simulate mouse move over the first box
    fireEvent.mouseMove(canvas, {
      clientX: 30,
      clientY: 30,
    });

    expect(onSelected).toHaveBeenCalled();
  });

  test('calls onSelected with -1 when mouse leaves canvas', async () => {
    const onSelected = jest.fn();
    render(<Boundingbox {...defaultProps} onSelected={onSelected} />);

    const canvas = document.querySelector('.boundingBoxCanvas');

    await waitFor(() => {
      expect(canvas).toBeInTheDocument();
    });

    fireEvent.mouseOut(canvas);

    expect(onSelected).toHaveBeenCalledWith(-1);
  });

  test('renders with custom options', () => {
    const customOptions = {
      colors: {
        normal: 'rgba(255,0,0,1)',
        selected: 'rgba(0,255,0,1)',
        unselected: 'rgba(0,0,255,1)',
      },
      style: {
        maxWidth: '500px',
        maxHeight: '400px',
      },
    };

    render(<Boundingbox {...defaultProps} options={customOptions} />);

    const canvas = document.querySelector('.boundingBoxCanvas');
    expect(canvas).toBeInTheDocument();
  });

  test('renders with selectedIndex prop', async () => {
    render(<Boundingbox {...defaultProps} selectedIndex={0} />);

    await waitFor(() => {
      const canvas = document.querySelector('.boundingBoxCanvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  test('handles base64 images', () => {
    const base64Options = { base64Image: true };
    const base64Image =
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

    render(<Boundingbox image={base64Image} options={base64Options} />);

    const canvas = document.querySelector('.boundingBoxCanvas');
    expect(canvas).toBeInTheDocument();
  });

  test('handles segmentation with separateSegmentation', () => {
    const segmentationProps = {
      ...defaultProps,
      pixelSegmentation: new Array(10000).fill(1),
      separateSegmentation: true,
    };

    render(<Boundingbox {...segmentationProps} />);

    const mainCanvas = document.querySelector('.boundingBoxCanvas');
    const segCanvas = document.querySelector('.boundingSegmentationCanvas');

    expect(mainCanvas).toBeInTheDocument();
    expect(segCanvas).toBeInTheDocument();
  });

  test('fetches segmentation JSON from URL', async () => {
    const mockSegmentationData = {
      body: {
        predictions: [
          {
            vals: new Array(10000).fill(1),
          },
        ],
      },
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSegmentationData,
    });

    render(
      <Boundingbox
        {...defaultProps}
        segmentationJsonUrl="./test-segmentation.json"
      />
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('./test-segmentation.json');
    });
  });

  test('handles segmentationMasks prop', () => {
    const segmentationMasks = [
      { width: 50, height: 50, data: new Array(2500).fill(1) },
      { width: 40, height: 40, data: new Array(1600).fill(1) },
    ];

    const boxesWithMinMax = [
      { xmin: 10, ymin: 10, xmax: 60, ymax: 60, label: 0 },
      { xmin: 70, ymin: 70, xmax: 110, ymax: 110, label: 1 },
    ];

    render(
      <Boundingbox
        {...defaultProps}
        boxes={boxesWithMinMax}
        segmentationMasks={segmentationMasks}
        separateSegmentation={true}
      />
    );

    const canvas = document.querySelector('.boundingBoxCanvas');
    expect(canvas).toBeInTheDocument();
  });

  test('handles custom drawBox function', () => {
    const customDrawBox = jest.fn();

    render(<Boundingbox {...defaultProps} drawBox={customDrawBox} />);

    const canvas = document.querySelector('.boundingBoxCanvas');
    expect(canvas).toBeInTheDocument();
  });

  test('handles custom drawLabel function', () => {
    const customDrawLabel = jest.fn();
    const boxesWithLabels = [{ coord: [10, 10, 50, 50], label: 'Test Label' }];

    render(
      <Boundingbox
        {...defaultProps}
        boxes={boxesWithLabels}
        drawLabel={customDrawLabel}
      />
    );

    const canvas = document.querySelector('.boundingBoxCanvas');
    expect(canvas).toBeInTheDocument();
  });

  test('handles segmentationColors prop', () => {
    const segmentationColors = ['#ff0000', '#00ff00', '#0000ff'];

    render(
      <Boundingbox
        {...defaultProps}
        pixelSegmentation={new Array(10000).fill(1)}
        segmentationColors={segmentationColors}
      />
    );

    const canvas = document.querySelector('.boundingBoxCanvas');
    expect(canvas).toBeInTheDocument();
  });

  test('handles null and undefined boxes gracefully', () => {
    render(<Boundingbox image="test.jpg" boxes={null} />);

    const canvas = document.querySelector('.boundingBoxCanvas');
    expect(canvas).toBeInTheDocument();
  });

  test('handles empty boxes array', () => {
    render(<Boundingbox image="test.jpg" boxes={[]} />);

    const canvas = document.querySelector('.boundingBoxCanvas');
    expect(canvas).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<Boundingbox {...defaultProps} className="custom-class" />);

    const container = document.querySelector('.custom-class');
    expect(container).toBeInTheDocument();
  });
});
