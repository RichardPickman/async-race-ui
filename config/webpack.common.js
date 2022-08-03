const StylelintPlugin = require('stylelint-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./webpack.paths');

module.exports = {
  commonModules: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer({
                    overrideBrowserslist: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
                  }),
                ],
                sourceMap: true,
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.js$/i,
        exclude: '/node_modules',
        use: 'babel-loader',
      },
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/inline',
      },
    ],
  },
  commonPlugins: [
    new HtmlWebpackPlugin({
      minify: true,
      title: 'Async Race',
      filename: 'index.html',
      template: `${paths.src}/index.html`,
      favicon: `${paths.src}/assets/favicon.ico`,
    }),
    new StylelintPlugin(),
  ],
  commonResolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '~': paths.src,
    },
  },
};
