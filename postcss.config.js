const webpack = require('webpack');

const postcssConfig = {
  plugins: [
    require('postcss-import')({addDependencyTo: webpack}),
    require('precss'),
    require('autoprefixer')
  ]
};
