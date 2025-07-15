# React Bounding Box - API Reference

## Component Overview

The `Boundingbox` component is a React component that displays bounding boxes and segmentation overlays on images using HTML5 Canvas.

## Props

### Required Props

#### `image`

- **Type**: `string`
- **Description**: URL or path to the image to display
- **Example**: `"https://example.com/image.jpg"` or `"./local-image.jpg"`

### Optional Props

#### `boxes`

- **Type**: `Array<Array<number> | Object>`
- **Default**: `[]`
- **Description**: Array of bounding box definitions
- **Formats**:
  - Array format: `[x, y, width, height]`
  - Object format: `{xmin, ymin, xmax, ymax}`
  - Object with coord: `{coord: [x, y, w, h], label: "text"}`

**Example:**

```javascript
// Array format
boxes={[[0, 0, 250, 250], [300, 0, 250, 250]]}

// Object format
boxes={[
  {xmin: 0, ymin: 0, xmax: 250, ymax: 250},
  {xmin: 300, ymin: 0, xmax: 550, ymax: 250}
]}

// Object with coord and label
boxes={[
  {coord: [0, 0, 250, 250], label: "Person"},
  {coord: [300, 0, 250, 250], label: "Car"}
]}
```

#### `options`

- **Type**: `Object`
- **Description**: Configuration options for styling and behavior
- **Properties**:
  - `colors`: Color scheme for bounding boxes
  - `style`: CSS styles for main canvas
  - `styleSegmentation`: CSS styles for segmentation canvas
  - `base64Image`: Whether image is base64 encoded

**Default:**

```javascript
{
  colors: {
    normal: 'rgba(255,225,255,1)',
    selected: 'rgba(0,225,204,1)',
    unselected: 'rgba(100,100,100,1)'
  },
  style: {
    maxWidth: '100%',
    maxHeight: '90vh'
  },
  styleSegmentation: {
    maxWidth: '100%',
    maxHeight: '90vh',
    pointerEvents: 'none'
  },
  base64Image: false
}
```

### Segmentation Props

#### `pixelSegmentation`

- **Type**: `Array<number>`
- **Description**: Array of pixel class indices for full image segmentation
- **Usage**: Direct pixel data for segmentation overlay

#### `segmentationJsonUrl`

- **Type**: `string`
- **Description**: URL to JSON file containing segmentation data (deepdetect format)
- **Example**: `"./segmentation.json"`

#### `segmentationMasks`

- **Type**: `Array<Object>`
- **Description**: Array of segmentation mask objects
- **Format**: `{width: number, height: number, data: Array<number>}`

#### `segmentationColors`

- **Type**: `Array<string>`
- **Description**: Custom color palette for segmentation classes
- **Example**: `['#1b9e77', '#d95f02', '#7570b3']`

#### `segmentationTransparency`

- **Type**: `number`
- **Default**: `190`
- **Range**: `0-255`
- **Description**: Alpha value for segmentation overlay transparency

#### `separateSegmentation`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Whether to render segmentation on separate canvas (useful for cross-origin images)

### Interaction Props

#### `selectedIndex`

- **Type**: `number`
- **Description**: Index of currently selected bounding box
- **Usage**: For external control of selection state

#### `onSelected`

- **Type**: `function`
- **Default**: `() => {}`
- **Parameters**: `(index: number) => void`
- **Description**: Callback fired when a bounding box is hovered/selected

#### `className`

- **Type**: `string`
- **Description**: CSS class name for the container div

### Custom Rendering Props

#### `drawBox`

- **Type**: `function`
- **Parameters**: `(canvas, box, color, lineWidth) => void`
- **Description**: Custom function to render bounding boxes
- **Default**: Renders segmented corner boxes

#### `drawLabel`

- **Type**: `function`
- **Parameters**: `(canvas, box) => void`
- **Description**: Custom function to render box labels
- **Default**: Renders text labels below boxes

## Methods

The component exposes several internal methods through refs:

### `renderBoxes(boxes?)`

- **Parameters**: `boxes` (optional) - Array of boxes to render
- **Description**: Re-renders all bounding boxes

### `renderSegmentation(segmentation)`

- **Parameters**: `segmentation` - Pixel segmentation data
- **Description**: Renders pixel-level segmentation overlay

### `segmentColor(classIndex)`

- **Parameters**: `classIndex` - Segmentation class index
- **Returns**: `[r, g, b]` color array
- **Description**: Gets color for segmentation class (cached)

## Canvas Architecture

The component uses a dual-canvas approach:

- **Main Canvas**: Renders base image and bounding boxes
- **Segmentation Canvas**: Optional separate canvas for segmentation overlays

### Canvas Scaling

The component automatically handles canvas scaling for responsive design:

- Mouse coordinates are scaled to match canvas dimensions
- Line width adapts based on canvas size (2px → 3px → 5px)

## Data Formats

### Bounding Box Coordinates

The component supports flexible coordinate systems:

1. **Array Format**: `[x, y, width, height]`
2. **Object Format**: `{xmin, ymin, xmax, ymax}`

Both formats handle different coordinate origins (top-left or bottom-left) using absolute values.

### Segmentation Data

1. **Pixel Arrays**: Direct pixel class indices
2. **JSON Format**: deepdetect-compatible JSON structure
3. **Mask Objects**: Region-specific masks with dimensions

## Usage Examples

### Basic Bounding Boxes

```javascript
<Boundingbox
  image="path/to/image.jpg"
  boxes={[
    [0, 0, 250, 250],
    [300, 0, 250, 250],
  ]}
  onSelected={index => console.log('Selected box:', index)}
/>
```

### With Custom Colors

```javascript
<Boundingbox
  image="path/to/image.jpg"
  boxes={boxes}
  options={{
    colors: {
      normal: 'rgba(255, 0, 0, 1)',
      selected: 'rgba(0, 255, 0, 1)',
      unselected: 'rgba(128, 128, 128, 0.5)',
    },
  }}
/>
```

### Segmentation Overlay

```javascript
<Boundingbox
  image="path/to/image.jpg"
  segmentationJsonUrl="./segmentation.json"
  separateSegmentation={true}
  segmentationColors={['#ff0000', '#00ff00', '#0000ff']}
/>
```

### Custom Rendering

```javascript
<Boundingbox
  image="path/to/image.jpg"
  boxes={boxes}
  drawBox={(canvas, box, color, lineWidth) => {
    // Custom box rendering logic
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    // ... custom drawing code
  }}
/>
```

## Performance Considerations

- Canvas operations are optimized for smooth interaction
- Segmentation rendering is cached to prevent unnecessary re-computation
- Mouse events use requestAnimationFrame for smooth hover effects
- Large images are automatically scaled for responsive display
