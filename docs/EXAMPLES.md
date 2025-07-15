# React Bounding Box - Usage Examples

## Table of Contents

- [Basic Usage](#basic-usage)
- [Bounding Box Formats](#bounding-box-formats)
- [Interactive Features](#interactive-features)
- [Segmentation](#segmentation)
- [Custom Styling](#custom-styling)
- [Advanced Customization](#advanced-customization)

## Basic Usage

### Simple Bounding Boxes

Display basic bounding boxes on an image:

```javascript
import React from 'react';
import Boundingbox from 'react-bounding-box';

function App() {
  const boxes = [
    [0, 0, 250, 250], // [x, y, width, height]
    [300, 0, 250, 250],
    [700, 0, 300, 25],
    [1100, 0, 25, 300],
  ];

  return <Boundingbox image="https://example.com/image.jpg" boxes={boxes} />;
}
```

### Using Local Images

```javascript
import demoImage from './assets/demo-image.jpg';

function LocalImageExample() {
  return <Boundingbox image={demoImage} boxes={[[50, 50, 200, 200]]} />;
}
```

## Bounding Box Formats

### Array Format

Standard `[x, y, width, height]` format:

```javascript
const arrayBoxes = [
  [0, 0, 250, 250],
  [300, 0, 250, 250],
];

<Boundingbox image={image} boxes={arrayBoxes} />;
```

### Object Format with Min/Max Coordinates

Using `{xmin, ymin, xmax, ymax}` format:

```javascript
const objectBoxes = [
  { xmin: 0, ymin: 0, xmax: 250, ymax: 250 },
  { xmin: 300, ymin: 0, xmax: 550, ymax: 250 },
];

<Boundingbox image={image} boxes={objectBoxes} />;
```

### Object Format with Labels

Including labels for each bounding box:

```javascript
const labeledBoxes = [
  { coord: [0, 0, 250, 250], label: 'Person' },
  { coord: [300, 0, 250, 250], label: 'Car' },
  { coord: [700, 0, 300, 25], label: 'Sign' },
  { coord: [1100, 0, 25, 300], label: 'Pole' },
];

<Boundingbox image={image} boxes={labeledBoxes} />;
```

## Interactive Features

### Box Selection Handling

Handle box selection events:

```javascript
import React, { useState } from 'react';

function InteractiveExample() {
  const [selectedBox, setSelectedBox] = useState(-1);

  const boxes = [
    [0, 0, 250, 250],
    [300, 0, 250, 250],
  ];

  const handleBoxSelection = index => {
    setSelectedBox(index);
    if (index >= 0) {
      console.log(`Selected box ${index}:`, boxes[index]);
    }
  };

  return (
    <div>
      <Boundingbox
        image="path/to/image.jpg"
        boxes={boxes}
        onSelected={handleBoxSelection}
        selectedIndex={selectedBox}
      />
      {selectedBox >= 0 && <p>Selected box: {selectedBox}</p>}
    </div>
  );
}
```

### External Box Selection Control

Control box selection programmatically:

```javascript
function ControlledSelection() {
  const [currentBox, setCurrentBox] = useState(0);
  const boxes = [
    [0, 0, 250, 250],
    [300, 0, 250, 250],
    [600, 0, 250, 250],
  ];

  return (
    <div>
      <div>
        <button onClick={() => setCurrentBox(0)}>Box 1</button>
        <button onClick={() => setCurrentBox(1)}>Box 2</button>
        <button onClick={() => setCurrentBox(2)}>Box 3</button>
        <button onClick={() => setCurrentBox(-1)}>Clear</button>
      </div>
      <Boundingbox
        image="path/to/image.jpg"
        boxes={boxes}
        selectedIndex={currentBox}
        onSelected={setCurrentBox}
      />
    </div>
  );
}
```

## Segmentation

### Pixel-level Segmentation

Display segmentation overlay from pixel data:

```javascript
// Assuming you have segmentation data
const segmentationData = [0, 0, 1, 1, 2, 2, ...]; // pixel class indices

function SegmentationExample() {
  return (
    <Boundingbox
      image="path/to/image.jpg"
      pixelSegmentation={segmentationData}
    />
  );
}
```

### Loading Segmentation from JSON

Load segmentation data from external JSON file:

```javascript
function JsonSegmentationExample() {
  return (
    <Boundingbox
      image="path/to/image.jpg"
      segmentationJsonUrl="./segmentation.json"
    />
  );
}
```

### Custom Segmentation Colors

Define custom color palette for segmentation classes:

```javascript
function CustomColorsSegmentation() {
  const colors = [
    '#1b9e77',
    '#d95f02',
    '#7570b3',
    '#e7298a',
    '#66a61e',
    '#e6ab02',
  ];

  return (
    <Boundingbox
      image="path/to/image.jpg"
      segmentationJsonUrl="./segmentation.json"
      segmentationColors={colors}
    />
  );
}
```

### Separate Segmentation Canvas

For cross-origin images, use separate segmentation canvas:

```javascript
function SeparateSegmentationExample() {
  return (
    <Boundingbox
      image="https://external-domain.com/image.jpg"
      segmentationJsonUrl="./segmentation.json"
      separateSegmentation={true}
    />
  );
}
```

### Segmentation Masks

Use region-specific segmentation masks:

```javascript
const segmentationMasks = [
  {
    width: 100,
    height: 100,
    data: [0, 0, 1, 1, 0, 0, ...] // mask data
  }
];

const maskBoxes = [
  {xmin: 50, ymin: 50, xmax: 150, ymax: 150}
];

function MaskSegmentationExample() {
  return (
    <Boundingbox
      image="path/to/image.jpg"
      segmentationMasks={segmentationMasks}
      boxes={maskBoxes}
      separateSegmentation={true}
      segmentationTransparency={150}
    />
  );
}
```

## Custom Styling

### Custom Colors

Customize bounding box colors:

```javascript
function CustomColorsExample() {
  const customOptions = {
    colors: {
      normal: 'rgba(255, 0, 0, 1)', // Red for normal state
      selected: 'rgba(0, 255, 0, 1)', // Green for selected
      unselected: 'rgba(128, 128, 128, 0.5)', // Gray for unselected
    },
  };

  return (
    <Boundingbox
      image="path/to/image.jpg"
      boxes={[[0, 0, 250, 250]]}
      options={customOptions}
    />
  );
}
```

### Responsive Sizing

Control canvas sizing with CSS:

```javascript
function ResponsiveExample() {
  const responsiveOptions = {
    style: {
      maxWidth: '100%',
      maxHeight: '80vh',
      border: '2px solid #ccc',
      borderRadius: '8px',
    },
  };

  return (
    <Boundingbox
      image="path/to/image.jpg"
      boxes={[[0, 0, 250, 250]]}
      options={responsiveOptions}
    />
  );
}
```

### CSS Class Integration

Add custom CSS classes:

```javascript
// CSS
.custom-boundingbox {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin: 20px auto;
  display: block;
}

// Component
function StyledExample() {
  return (
    <Boundingbox
      className="custom-boundingbox"
      image="path/to/image.jpg"
      boxes={[[0, 0, 250, 250]]}
    />
  );
}
```

## Advanced Customization

### Custom Box Rendering

Create custom bounding box appearance:

```javascript
function CustomBoxExample() {
  const customDrawBox = (canvas, box, color, lineWidth) => {
    const ctx = canvas.getContext('2d');
    const coord = box.coord ? box.coord : box;

    let [x, y, width, height] = coord;

    // Draw filled rectangle with border
    ctx.fillStyle = color.replace('1)', '0.2)'); // Semi-transparent fill
    ctx.fillRect(x, y, width, height);

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(x, y, width, height);

    // Add corner indicators
    const cornerSize = 10;
    ctx.fillStyle = color;
    ctx.fillRect(
      x - cornerSize / 2,
      y - cornerSize / 2,
      cornerSize,
      cornerSize
    );
    ctx.fillRect(
      x + width - cornerSize / 2,
      y - cornerSize / 2,
      cornerSize,
      cornerSize
    );
    ctx.fillRect(
      x - cornerSize / 2,
      y + height - cornerSize / 2,
      cornerSize,
      cornerSize
    );
    ctx.fillRect(
      x + width - cornerSize / 2,
      y + height - cornerSize / 2,
      cornerSize,
      cornerSize
    );
  };

  return (
    <Boundingbox
      image="path/to/image.jpg"
      boxes={[[100, 100, 200, 150]]}
      drawBox={customDrawBox}
    />
  );
}
```

### Custom Label Rendering

Customize how labels are displayed:

```javascript
function CustomLabelExample() {
  const customDrawLabel = (canvas, box) => {
    if (!box.label) return;

    const ctx = canvas.getContext('2d');
    const coord = box.coord ? box.coord : box;
    let [x, y, width, height] = coord;

    // Set text properties
    ctx.font = '16px Arial';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;

    // Measure text for background
    const textMetrics = ctx.measureText(box.label);
    const textHeight = 20;
    const padding = 4;

    // Draw background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(
      x,
      y - textHeight - padding,
      textMetrics.width + padding * 2,
      textHeight + padding * 2
    );

    // Draw text outline and fill
    ctx.strokeText(box.label, x + padding, y - padding);
    ctx.fillStyle = 'white';
    ctx.fillText(box.label, x + padding, y - padding);
  };

  const boxes = [
    { coord: [50, 50, 200, 150], label: 'Custom Label' },
    { coord: [300, 50, 150, 100], label: 'Another Box' },
  ];

  return (
    <Boundingbox
      image="path/to/image.jpg"
      boxes={boxes}
      drawLabel={customDrawLabel}
    />
  );
}
```

### Base64 Image Support

Use base64 encoded images:

```javascript
function Base64Example() {
  const base64Image =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';

  return (
    <Boundingbox
      image={base64Image}
      boxes={[[0, 0, 100, 100]]}
      options={{ base64Image: true }}
    />
  );
}
```

### Dynamic Box Updates

Update boxes dynamically:

```javascript
function DynamicBoxExample() {
  const [boxes, setBoxes] = useState([[100, 100, 100, 100]]);

  const addRandomBox = () => {
    const newBox = [
      Math.random() * 400,
      Math.random() * 300,
      50 + Math.random() * 100,
      50 + Math.random() * 100,
    ];
    setBoxes([...boxes, newBox]);
  };

  const clearBoxes = () => setBoxes([]);

  return (
    <div>
      <div>
        <button onClick={addRandomBox}>Add Random Box</button>
        <button onClick={clearBoxes}>Clear All</button>
      </div>
      <Boundingbox
        image="path/to/image.jpg"
        boxes={boxes}
        onSelected={index => {
          if (index >= 0) {
            console.log('Selected box:', boxes[index]);
          }
        }}
      />
    </div>
  );
}
```

## Integration Examples

### With State Management (Redux)

```javascript
import { useSelector, useDispatch } from 'react-redux';
import { selectBox, updateBoxes } from './store/boxSlice';

function ReduxIntegrationExample() {
  const { boxes, selectedIndex } = useSelector(state => state.boxes);
  const dispatch = useDispatch();

  return (
    <Boundingbox
      image="path/to/image.jpg"
      boxes={boxes}
      selectedIndex={selectedIndex}
      onSelected={index => dispatch(selectBox(index))}
    />
  );
}
```

### With TypeScript

```typescript
import React, { useState } from 'react';
import Boundingbox from 'react-bounding-box';

interface Box {
  coord: [number, number, number, number];
  label?: string;
}

const TypeScriptExample: React.FC = () => {
  const [boxes] = useState<Box[]>([
    { coord: [0, 0, 250, 250], label: "Object 1" },
    { coord: [300, 0, 250, 250], label: "Object 2" }
  ]);

  const handleSelection = (index: number): void => {
    console.log('Selected box index:', index);
  };

  return (
    <Boundingbox
      image="path/to/image.jpg"
      boxes={boxes}
      onSelected={handleSelection}
    />
  );
};
```

These examples demonstrate the flexibility and power of the React Bounding Box component. You can combine these patterns to create sophisticated image annotation and visualization interfaces.
