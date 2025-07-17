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
  features: {
    buildStoriesJson: true,
  },
  managerHead: (head) => `
    ${head}
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self' ws: wss:;">
  `,
  previewHead: (head) => `
    ${head}
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' ws: wss:; frame-src 'self';">
  `,
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
