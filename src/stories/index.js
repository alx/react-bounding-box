import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Boundingbox from '../index';

storiesOf('Boundingbox', module)
  .add('default view', () => {
    const params = {
      image: 'http://i.imgur.com/gF7QYwa.jpg',
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
      image: 'http://i.imgur.com/gF7QYwa.jpg',
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
      image: 'http://i.imgur.com/gF7QYwa.jpg',
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
    var json = require('../../public/ADE_val_00000761.json')
    return (<Boundingbox
      image={'./ADE_val_00000761.jpg'}
      pixelSegmentation={json.body.predictions[0].vals}
    />);
  })
  .add('pixel segmentation', () => {
    var json = require('../../public/ADE_val_00000761.json')
    return (<Boundingbox
      image={'./ADE_val_00000761.jpg'}
      pixelSegmentation={json.body.predictions[0].vals}
    />);
  })
  .add('pixel segmentation from json url', () => {
    return (<Boundingbox
      image={'./ADE_val_00000761.jpg'}
      segmentationJson={'./ADE_val_00000761.json'}
    />);
  })
  .add('pixel segmentation - no square result', () => {
    return (<Boundingbox
      image={'./multi.jpeg'}
      segmentationJson={'./multi.json'}
    />);
  })
  .add('pixel segmentation on remote image', () => {
    return (<Boundingbox
      image={'http://localhost/ADE_val_00000761.jpg'}
      segmentationJson={'./ADE_val_00000761.json'}
      separateSegmentation={true}
    />);
  });
