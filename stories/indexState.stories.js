import React from 'react';

import { storiesOf } from '@storybook/react';

import Boundingbox from '../src/react-bounding-box';

import demoImage from './static/image.jpg';
import demoImageLarge from './static/imageLarge.png';
import demoImageDog from './static/dog.jpg';

import { withState, Store } from '@sambego/storybook-state';

const store = new Store({
  index: 0,
  images: [
    demoImage,
    demoImageLarge,
    demoImageDog
  ],
  boxes: [
    [
      [0, 0, 250, 250]
    ],
    [
      [50, 50, 250, 250]
    ],
    [
      [100, 100, 250, 250]
    ]
  ]
});

storiesOf('Boundingbox with State', module)
  .addDecorator(withState())
  .addParameters({ state: { store } })
  .add('redraw image', () => state => [
      <button key='btn-demoImage' onClick={() => {
        store.set({index: 0})
      }}>demoImage</button>,
      <button key='btn-demoImageLarge' onClick={() => {
        store.set({index: 1})
      }}>demoImageLarge</button>,
      <button key='btn-demoImageDog' onClick={() => {
        store.set({index: 2})
      }}>demoImageDog</button>,
      <p key='current-index'>current index: {state.index}</p>,
      <Boundingbox
        key='bounding-box'
        image={state.images[state.index]}
        boxes={state.boxes[state.index]}
      />
   ]);
