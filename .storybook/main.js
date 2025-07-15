module.exports = {
  stories: ['../stories/no-jsx.stories.js'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-actions'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  typescript: {
    reactDocgen: false,
  },
  staticDirs: ['../stories/static'],
  babel: async (options) => ({
    ...options,
    presets: [
      ...options.presets,
      '@babel/preset-react'
    ]
  }),
};