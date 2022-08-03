const common = require('./webpack.common');
const paths = require('./webpack.paths');

const { commonModules, commonPlugins, commonResolve } = common;

module.exports = {
  mode: 'production',
  entry: `${paths.src}/index.ts`,
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    assetModuleFilename: 'assets/[name][ext]',
    clean: true,
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
