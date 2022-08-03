const common = require('./webpack.common');
const paths = require('./webpack.paths');

const { commonModules, commonPlugins, commonResolve } = common;

module.exports = {
  mode: 'development',
  entry: `${paths.src}/index.ts`,
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    assetModuleFilename: 'assets/[name][ext]',
    clean: true,
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8280,
  },
  module: {
    ...commonModules,
  },
  plugins: [
    ...commonPlugins,
  ],
  resolve: {
    ...commonResolve,
  },
};
