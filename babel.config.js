module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: '16',
        browsers: ['> 1%', 'last 2 versions', 'not dead']
      }
    }],
    ['@babel/preset-react', {
      runtime: 'automatic'
    }]
  ],
  plugins: [
    '@babel/plugin-transform-class-properties'
  ]
};