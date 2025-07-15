import React from 'react';
import { action } from '@storybook/addon-actions';
import Boundingbox from '../src/react-bounding-box';

export default {
  title: 'React Bounding Box',
  component: Boundingbox,
};

export const BasicExample = {
  render: (args) => React.createElement(Boundingbox, {
    image: './static/image.jpg',
    boxes: [[50, 50, 150, 100], [250, 80, 120, 120]],
    onSelected: action('box-selected'),
    ...args
  }),
};