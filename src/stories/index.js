import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Boundingbox from '../index';

import './static/styles.css';

import demoImage from './static/image.jpg';
import demoImageLarge from './static/imageLarge.png';
import segmentationJson from './static/segmentation.json';

storiesOf('Boundingbox', module)
  .add('default view', () => {
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
    return (<Boundingbox
      image={params.image}
      boxes={params.boxes}
    />);
  })
  .add('box selection', () => {
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
    return (<Boundingbox
      image={params.image}
      boxes={params.boxes}
      onSelected={action('selected')}
    />);
  })
  .add('label display', () => {
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
    return (<Boundingbox
      image={params.image}
      boxes={params.boxes}
    />);
  })
  .add('pixel segmentation', () => {
    return (<Boundingbox
      image={demoImage}
      pixelSegmentation={segmentationJson.body.predictions[0].vals}
    />);
  })
  .add('pixel segmentation', () => {
    return (<Boundingbox
      image={demoImage}
      pixelSegmentation={segmentationJson.body.predictions[0].vals}
    />);
  })
  .add('pixel segmentation from json url', () => {
    //
    // If github is down, you can use these url locally:
    //   image={'http://localhost:9010/image.jpg'}
    //   segmentationJsonUrl={'./segmentation.json'}
    //
    return (<Boundingbox
      image={demoImage}
      segmentationJsonUrl={'./segmentation.json'}
    />);
  })
  .add('pixel segmentation color scheme', () => {
    return (<Boundingbox
      image={demoImage}
      segmentationJsonUrl={'./segmentation.json'}
      segmentationColors={
        ['#1b9e77','#d95f02','#7570b3','#e7298a','#66a61e','#e6ab02','#a6761d','#666666']
      }
    />);
  })
  .add('pixel segmentation on remote image', () => {
    //
    // If github is down, you can use these url locally:
    //   image={'http://localhost:9010/image.jpg'}
    //
    return (<Boundingbox
      image={'https://alx.github.io/react-bounding-box/image.jpg'}
      segmentationJsonUrl={'./segmentation.json'}
      separateSegmentation={true}
    />);
  })
  .add('pixel segmentation on remote image with css', () => {
    //
    // If github is down, you can use these url locally:
    //   image={'http://localhost:9010/image.jpg'}
    //
    //
    // css for this story is avaible in ./static/styles.css
    //
    return (<div className="cssStory">
      <Boundingbox
        image={'https://alx.github.io/react-bounding-box/image.jpg'}
        segmentationJsonUrl={'./segmentation.json'}
        separateSegmentation={true}
      />
    </div>);
  });
