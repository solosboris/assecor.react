module.exports = {
  plugins: [
    'babel-plugin-react-compiler', // must run first!
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['>0.25%', 'not dead'],
        },
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic', // no need to import React
      },
    ],
  ],
};