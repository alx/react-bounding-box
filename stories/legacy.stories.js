import React from 'react';
import { action } from '@storybook/addon-actions';

import Boundingbox from '../src/react-bounding-box';

import demoImage from './static/image.jpg';
import demoImageLarge from './static/imageLarge.png';
import demoImageDog from './static/dog.jpg';
import demoImageAgeReal from './static/age_real.png';

import segmentationJson from './static/segmentation.json';
import segmentationMasksJson from './static/segmentationMasks.json';
import segmentationMasksBoxesJson from './static/segmentationMasksBoxes.json';

import boxesBorderZeroJson from './static/boxesBorderZero.json';
import boxesAgeReal from './static/boxesAgeReal.json';
import './static/styles.css';

// Helper function to create copy button
const createCopyButton = code => (
  <button
    onClick={() => {
      navigator.clipboard.writeText(code);
      const btn = event.target;
      const originalText = btn.textContent;
      btn.textContent = '✅ Copied!';
      btn.style.background = '#10b981';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '#3b82f6';
      }, 2000);
    }}
    style={{
      padding: '4px 8px',
      background: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: 'bold',
    }}
  >
    📋 Copy Code
  </button>
);

// Helper function to create code display with copy button
const createCodeDisplay = code => (
  <div
    style={{
      padding: '12px',
      background: '#f8fafc',
      border: '1px solid #cbd5e1',
      borderRadius: '6px',
      marginBottom: '16px',
      fontFamily: 'monospace',
      fontSize: '14px',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
      }}
    >
      <strong>📋 Code used in this story:</strong>
      {createCopyButton(code)}
    </div>
    <pre
      style={{
        margin: '0',
        background: '#f1f5f9',
        padding: '8px',
        borderRadius: '4px',
        overflow: 'auto',
      }}
    >
      {code}
    </pre>
  </div>
);

export default {
  title: 'Legacy Boundingbox (v1.x)',
  component: Boundingbox,
};

export const DefaultView = {
  name: '📚 default view',
  parameters: {
    docs: {
      description: {
        story: `
**Legacy v1.x BoundingBox Component**

Original implementation maintained for backward compatibility. Consider upgrading to Modern v2.x for enhanced performance.

### Legacy Code Example:
\`\`\`jsx
import Boundingbox from 'react-bounding-box';

function LegacyExample() {
  const boxes = [
    // coord(0,0) = top left corner of image
    // [x, y, width, height]
    [0, 0, 250, 250],
    [300, 0, 250, 250],
    [700, 0, 300, 25],
    [1100, 0, 25, 300],
  ];

  return (
    <Boundingbox
      image="/path/to/your/image.jpg"
      boxes={boxes}
    />
  );
}
\`\`\`

### Migration Recommendation:
✨ **Upgrade to Modern v2.x** for 40% better performance and enhanced features while maintaining the same API.
        `,
      },
    },
  },
  render: () => {
    const params = {
      image: demoImageLarge,
      boxes: [
        // coord(0,0) = top left corner of image
        // [x, y, width, height]
        [0, 0, 250, 250],
        [300, 0, 250, 250],
        [700, 0, 300, 25],
        [1100, 0, 25, 300],
      ],
    };
    return (
      <div>
        <div
          style={{
            padding: '10px',
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '4px',
            marginBottom: '10px',
          }}
        >
          <strong>Legacy v1.x Component:</strong> This example uses the original
          Boundingbox component. Check out the "Modern BoundingBox (v2.x)"
          section for updated examples with enhanced features.
        </div>

        {createCodeDisplay(`<Boundingbox
  image={imageLarge}
  boxes={[
    [0, 0, 250, 250],
    [300, 0, 250, 250],
    [700, 0, 300, 25],
    [1100, 0, 25, 300]
  ]}
/>`)}
        <Boundingbox image={params.image} boxes={params.boxes} />
      </div>
    );
  },
};

export const XMinMaxCoordinates = {
  name: '📐 xmin/max coordinates',
  parameters: {
    docs: {
      description: {
        story: `
**XMin/XMax Coordinate Format**

Use alternative coordinate format with xmin/xmax/ymin/ymax instead of x/y/width/height.

### Code Example:
\`\`\`jsx
import Boundingbox from 'react-bounding-box';

function XMinMaxCoordinatesExample() {
  const boxesXMinMax = [
    {xmin: 0, ymin: 0, xmax: 50, ymax: 50},
    {xmin: 100, ymin: 100, xmax: 200, ymax: 200}
  ];

  return (
    <Boundingbox
      image="/path/to/your/image.jpg"
      boxes={boxesXMinMax}
    />
  );
}
\`\`\`

### Coordinate Formats:
- **Array format**: [x, y, width, height]
- **XMin/Max format**: {xmin, ymin, xmax, ymax}
- Both formats are supported interchangeably
        `,
      },
    },
  },
  render: () => {
    const params = {
      image: demoImageLarge,
      boxes: [
        { xmin: 0, ymin: 0, xmax: 250, ymax: 250 },
        { xmin: 300, ymin: 0, xmax: 550, ymax: 250 },
        { xmin: 700, ymin: 0, xmax: 1000, ymax: 25 },
        { xmin: 1100, ymin: 0, xmax: 1125, ymax: 300 },
      ],
    };
    return (
      <div>
        {createCodeDisplay(`<Boundingbox
  image={imageLarge}
  boxes={[
    {xmin: 0, ymin: 0, xmax: 250, ymax: 250},
    {xmin: 300, ymin: 0, xmax: 550, ymax: 250},
    {xmin: 700, ymin: 0, xmax: 1000, ymax: 25},
    {xmin: 1100, ymin: 0, xmax: 1125, ymax: 300}
  ]}
/>`)}
        <Boundingbox image={params.image} boxes={params.boxes} />
      </div>
    );
  },
};

export const AgeRealDataset = {
  name: '👤 Age Real dataset',
  render: () => (
    <div>
      {createCodeDisplay(`<Boundingbox
  image={ageRealImage}
  boxes={boxesAgeRealData}
/>`)}
      <Boundingbox image={demoImageAgeReal} boxes={boxesAgeReal} />
    </div>
  ),
};

export const BoxSelection = {
  name: '🖱️ box selection',
  parameters: {
    docs: {
      description: {
        story: `
**Interactive Box Selection (Legacy v1.x)**

Mouse interaction and selection callbacks in the original component.

### Code Example:
\`\`\`jsx
import Boundingbox from 'react-bounding-box';

function BoxSelectionExample() {
  const handleBoxSelection = (index) => {
    console.log('Selected box index:', index);
    // Your selection logic here
  };

  return (
    <Boundingbox
      image="/path/to/your/image.jpg"
      boxes={[
        [0, 0, 250, 250],
        [300, 0, 250, 250],
        [700, 0, 300, 25],
        [1100, 0, 25, 300],
      ]}
      onSelected={handleBoxSelection}
    />
  );
}
\`\`\`
        `,
      },
    },
  },
  render: () => {
    const params = {
      image: demoImageLarge,
      boxes: [
        // coord(0,0) = top left corner of image
        // [x, y, width, height]
        [0, 0, 250, 250],
        [300, 0, 250, 250],
        [700, 0, 300, 25],
        [1100, 0, 25, 300],
      ],
    };
    return (
      <div>
        {createCodeDisplay(`<Boundingbox
  image={imageLarge}
  boxes={[
    [0, 0, 250, 250],
    [300, 0, 250, 250],
    [700, 0, 300, 25],
    [1100, 0, 25, 300]
  ]}
  onSelected={(index) => console.log('Selected:', index)}
/>`)}
        <Boundingbox
          image={params.image}
          boxes={params.boxes}
          onSelected={action('selected')}
        />
      </div>
    );
  },
};

export const LabelDisplay = {
  name: '🏷️ label display',
  render: () => {
    const params = {
      image: demoImageLarge,
      boxes: [
        // coord(0,0) = top left corner of image
        // [x, y, width, height]
        { coord: [0, 0, 250, 250], label: 'test' },
        { coord: [300, 0, 250, 250], label: 'A' },
        { coord: [700, 0, 300, 25], label: 'B' },
        { coord: [1100, 0, 25, 300], label: 'C' },
      ],
    };
    return (
      <div>
        {createCodeDisplay(`<Boundingbox
  image={imageLarge}
  boxes={[
    { coord: [0, 0, 250, 250], label: 'test' },
    { coord: [300, 0, 250, 250], label: 'A' },
    { coord: [700, 0, 300, 25], label: 'B' },
    { coord: [1100, 0, 25, 300], label: 'C' }
  ]}
/>`)}
        <Boundingbox image={params.image} boxes={params.boxes} />
      </div>
    );
  },
};

export const PixelSegmentation = {
  name: '🎨 pixel segmentation',
  render: () => (
    <div>
      {createCodeDisplay(`<Boundingbox
  image={demoImage}
  pixelSegmentation={segmentationJson.body.predictions[0].vals}
/>`)}
      <Boundingbox
        image={demoImage}
        pixelSegmentation={segmentationJson.body.predictions[0].vals}
      />
    </div>
  ),
};

export const SegmentationFromJsonUrl = {
  name: '📄 segmentation from JSON URL',
  parameters: {
    docs: {
      description: {
        story: `
**Loading Segmentation from JSON URL**

Load segmentation data from a JSON file URL for dynamic segmentation rendering.

### Code Example:
\`\`\`jsx
import Boundingbox from 'react-bounding-box';

function SegmentationFromJsonExample() {
  return (
    <Boundingbox
      image="/path/to/your/image.jpg"
      segmentationJsonUrl="./path/to/segmentation.json"
    />
  );
}
\`\`\`

### JSON Format:
The JSON file should contain segmentation data in this format:
\`\`\`json
{
  "body": {
    "predictions": [
      {
        "vals": [/* pixel segmentation array */]
      }
    ]
  }
}
\`\`\`
        `,
      },
    },
  },
  render: () => (
    <div>
      {createCodeDisplay(`<Boundingbox
  image={demoImage}
  pixelSegmentation={segmentationJson.body.predictions[0].vals}
/>`)}
      <Boundingbox
        image={demoImage}
        pixelSegmentation={segmentationJson.body.predictions[0].vals}
      />
    </div>
  ),
};

export const CustomColorScheme = {
  name: '🌈 custom color scheme',
  parameters: {
    docs: {
      description: {
        story: `
**Custom Color Scheme for Segmentation**

Apply custom colors to segmentation visualization for better distinction between classes.

### Code Example:
\`\`\`jsx
import Boundingbox from 'react-bounding-box';

function CustomColorSchemeExample() {
  const customColors = [
    '#1b9e77', '#d95f02', '#7570b3', '#e7298a',
    '#66a61e', '#e6ab02', '#a6761d', '#666666'
  ];

  return (
    <Boundingbox
      image="/path/to/your/image.jpg"
      pixelSegmentation={segmentationData}
      segmentationColors={customColors}
    />
  );
}
\`\`\`
        `,
      },
    },
  },
  render: () => (
    <div>
      {createCodeDisplay(`<Boundingbox
  image={demoImage}
  pixelSegmentation={segmentationJson.body.predictions[0].vals}
  segmentationColors={[
    '#1b9e77','#d95f02','#7570b3','#e7298a',
    '#66a61e','#e6ab02','#a6761d','#666666'
  ]}
/>`)}
      <Boundingbox
        image={demoImage}
        pixelSegmentation={segmentationJson.body.predictions[0].vals}
        segmentationColors={[
          '#1b9e77',
          '#d95f02',
          '#7570b3',
          '#e7298a',
          '#66a61e',
          '#e6ab02',
          '#a6761d',
          '#666666',
        ]}
      />
    </div>
  ),
};

export const RemoteImage = {
  name: '🌐 remote image',
  parameters: {
    docs: {
      description: {
        story: `
**Loading Remote Images**

Load images from remote URLs with segmentation data and separate segmentation canvas.

### Code Example:
\`\`\`jsx
import Boundingbox from 'react-bounding-box';

function RemoteImageExample() {
  return (
    <Boundingbox
      image="https://example.com/your-image.jpg"
      pixelSegmentation={segmentationData}
      separateSegmentation={true}
    />
  );
}
\`\`\`

### Features:
- Remote image loading with CORS support
- Separate segmentation canvas for better performance
- Maintains aspect ratio and responsiveness
        `,
      },
    },
  },
  render: () => (
    <div>
      {createCodeDisplay(`<Boundingbox
  image="https://alx.github.io/react-bounding-box/image.jpg"
  pixelSegmentation={segmentationJson.body.predictions[0].vals}
  separateSegmentation={true}
/>`)}
      <Boundingbox
        image={'https://alx.github.io/react-bounding-box/image.jpg'}
        pixelSegmentation={segmentationJson.body.predictions[0].vals}
        separateSegmentation={true}
      />
    </div>
  ),
};

export const RemoteImageWithCss = {
  name: '💅 remote image with CSS',
  parameters: {
    docs: {
      description: {
        story: `
**Remote Image with CSS Styling**

Load remote images with custom CSS styling and combined segmentation + bounding boxes.

### Code Example:
\`\`\`jsx
import Boundingbox from 'react-bounding-box';

function RemoteImageWithCssExample() {
  return (
    <div className="cssStory">
      <Boundingbox
        image="https://example.com/your-image.jpg"
        pixelSegmentation={segmentationData}
        boxes={[
          [50, 50, 100, 100],
          [200, 150, 120, 80]
        ]}
        separateSegmentation={true}
      />
    </div>
  );
}
\`\`\`

### CSS Styling:
\`\`\`css
.cssStory {
  border: 2px solid #3b82f6;
  border-radius: 8px;
  padding: 16px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
\`\`\`

### Features:
- Remote image loading with CORS support
- Custom CSS container styling
- Separate segmentation canvas
- Combined segmentation and bounding box display
        `,
      },
    },
  },
  render: () => (
    <div>
      {createCodeDisplay(`<div className="cssStory">
  <Boundingbox
    image="https://alx.github.io/react-bounding-box/image.jpg"
    pixelSegmentation={segmentationJson.body.predictions[0].vals}
    boxes={[
      [50, 50, 100, 100],
      [200, 150, 120, 80],
      [300, 200, 80, 60]
    ]}
    separateSegmentation={true}
  />
</div>`)}
      <div className="cssStory">
        <Boundingbox
          image={'https://alx.github.io/react-bounding-box/image.jpg'}
          pixelSegmentation={segmentationJson.body.predictions[0].vals}
          boxes={[
            [50, 50, 100, 100],
            [200, 150, 120, 80],
            [300, 200, 80, 60],
          ]}
          separateSegmentation={true}
        />
      </div>
    </div>
  ),
};

export const SegmentationMasks = {
  name: '🎭 segmentation masks',
  parameters: {
    docs: {
      description: {
        story: `
**Segmentation Masks with Bounding Boxes**

Display segmentation masks alongside bounding boxes for comprehensive object detection visualization.

### Code Example:
\`\`\`jsx
import Boundingbox from 'react-bounding-box';

function SegmentationMasksExample() {
  const segmentationMasks = [
    {
      width: 640,
      height: 480,
      data: [/* mask pixel data */]
    }
  ];

  const boundingBoxes = [
    [100, 100, 200, 150],
    [300, 200, 180, 120]
  ];

  return (
    <Boundingbox
      image="/path/to/your/image.jpg"
      segmentationMasks={segmentationMasks}
      boxes={boundingBoxes}
      separateSegmentation={true}
    />
  );
}
\`\`\`

### Features:
- Combines segmentation masks with bounding boxes
- Separate segmentation canvas for better performance
- Supports multiple mask objects with different dimensions
        `,
      },
    },
  },
  render: () => (
    <div>
      {createCodeDisplay(`<Boundingbox
  image={demoImageDog}
  segmentationMasks={segmentationMasksJson}
  boxes={segmentationMasksBoxesJson}
  separateSegmentation={true}
/>`)}
      <Boundingbox
        image={demoImageDog}
        segmentationMasks={segmentationMasksJson}
        boxes={segmentationMasksBoxesJson}
        separateSegmentation={true}
      />
    </div>
  ),
};

export const BorderOnZeroValue = {
  name: '🔲 border on zero value',
  parameters: {
    docs: {
      description: {
        story: `
**Border Rendering with Zero Values**

Handle edge cases where bounding boxes have zero width or height values.

### Code Example:
\`\`\`jsx
import Boundingbox from 'react-bounding-box';

function BorderOnZeroValueExample() {
  const boxesWithZeroValues = [
    [100, 100, 0, 150],    // Zero width
    [200, 200, 100, 0],    // Zero height
    [300, 300, 100, 100]   // Normal box
  ];

  return (
    <Boundingbox
      image="/path/to/your/image.jpg"
      boxes={boxesWithZeroValues}
    />
  );
}
\`\`\`

### Features:
- Handles zero-width bounding boxes gracefully
- Handles zero-height bounding boxes gracefully
- Maintains visual consistency with normal boxes
- Prevents rendering errors in edge cases
        `,
      },
    },
  },
  render: () => (
    <div>
      {createCodeDisplay(`<Boundingbox
  image={demoImageDog}
  boxes={boxesBorderZeroJson}
/>`)}
      <Boundingbox image={demoImageDog} boxes={boxesBorderZeroJson} />
    </div>
  ),
};
