// Simple story without JSX to test Storybook build
import React from 'react';

export default {
  title: 'Simple Test',
  component: () => React.createElement('div', {}, 'Hello Storybook!'),
};

export const HelloWorld = {
  render: () => React.createElement('div', {
    style: { padding: '20px', fontSize: '18px', color: '#333' }
  }, 'Hello from Storybook!')
};