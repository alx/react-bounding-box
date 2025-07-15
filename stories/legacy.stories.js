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

export default {
  title: 'Legacy Boundingbox (v1.x)',
  component: Boundingbox,
};

export const DefaultView = {
  name: '📚 default view',
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
        <div style={{ padding: '10px', background: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '4px', marginBottom: '10px' }}>
          <strong>Legacy v1.x Component:</strong> This example uses the original Boundingbox component. 
          Check out the "Modern BoundingBox (v2.x)" section for updated examples with enhanced features.
        </div>
        <Boundingbox
          image={params.image}
          boxes={params.boxes}
        />
      </div>
    );
  }
};

export const XMinMaxCoordinates = {
  name: '📐 xmin/max coordinates',
  render: () => {
    const params = {
      image: demoImageLarge,
      boxes: [
        {xmin: 0, ymin: 0, xmax: 50, ymax: 50},
        {xmin: 100, ymin: 100, xmax: 200, ymax: 200}
      ],
    };
    return <Boundingbox image={params.image} boxes={params.boxes} />;
  }
};

export const AgeRealDataset = {
  name: '👤 Age Real dataset',
  render: () => <Boundingbox image={demoImageAgeReal} boxes={boxesAgeReal} />
};

export const BoxSelection = {
  name: '🖱️ box selection',
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
    return <Boundingbox
      image={params.image}
      boxes={params.boxes}
      onSelected={action('selected')}
    />;
  }
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
    return <Boundingbox image={params.image} boxes={params.boxes} />;
  }
};

export const PixelSegmentation = {
  name: '🎨 pixel segmentation',
  render: () => <Boundingbox
    image={demoImage}
    pixelSegmentation={segmentationJson.body.predictions[0].vals}
  />
};

export const SegmentationFromJsonUrl = {
  name: '📄 segmentation from JSON URL',
  render: () => <Boundingbox
    image={demoImage}
    segmentationJsonUrl={'./static/segmentation.json'}
  />
};

export const CustomColorScheme = {
  name: '🌈 custom color scheme',
  render: () => <Boundingbox
    image={demoImage}
    segmentationJsonUrl={'./static/segmentation.json'}
    segmentationColors={
      ['#1b9e77','#d95f02','#7570b3','#e7298a','#66a61e','#e6ab02','#a6761d','#666666']
    }
  />
};

export const RemoteImage = {
  name: '🌐 remote image',
  render: () => <Boundingbox
    image={'https://alx.github.io/react-bounding-box/image.jpg'}
    segmentationJsonUrl={'./static/segmentation.json'}
    separateSegmentation={true}
  />
};

export const RemoteImageWithCss = {
  name: '💅 remote image with CSS',
  render: () => (
    <div className="cssStory">
      <Boundingbox
        image={'https://alx.github.io/react-bounding-box/image.jpg'}
        segmentationJsonUrl={'./static/segmentation.json'}
        separateSegmentation={true}
      />
    </div>
  )
};

export const SegmentationMasks = {
  name: '🎭 segmentation masks',
  render: () => <Boundingbox
    image={demoImageDog}
    segmentationMasks={segmentationMasksJson}
    boxes={segmentationMasksBoxesJson}
    separateSegmentation={true}
  />
};

export const BorderOnZeroValue = {
  name: '🔲 border on zero value',
  render: () => <Boundingbox
    image={demoImageDog}
    boxes={boxesBorderZeroJson}
  />
};