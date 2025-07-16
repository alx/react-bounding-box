module.exports = {
  stories: [
    '../stories/welcome.stories.js',
    '../stories/simple.stories.js',
    '../stories/modern.stories.js',
    '../stories/legacy.stories.js',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-actions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  typescript: {
    reactDocgen: false,
  },
  staticDirs: ['../stories/static'],
  babel: async options => ({
    ...options,
    presets: [
      ...options.presets,
      ['@babel/preset-react', { runtime: 'automatic' }],
    ],
    plugins: [...(options.plugins || []), '@babel/plugin-transform-react-jsx'],
  }),
  webpackFinal: async config => {
    // Handle JSX files properly
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: { node: 'current' } }],
            ['@babel/preset-react', { runtime: 'automatic' }],
          ],
        },
      },
      exclude: /node_modules/,
    });

    return config;
  },
};
