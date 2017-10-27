const paths = require('./paths.js')
const eslintFormatter = require('react-dev-utils/eslintFormatter')
const stylelintFormatter = require('./stylelintFormatter')
const postcssUrlRebase = require('./postcssUrlRebase')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        test: /\.css$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: stylelintFormatter,
              plugins: () => [
                require('stylelint'),
                require('postcss-sass-each'),
                require('postcss-mixins'),
                require('postcss-import'),
                require('postcss-url')({
                  url: postcssUrlRebase,
                }),
                require('postcss-cssnext')({
                  features: {
                    customProperties: {
                      strict: false,
                    },
                  },
                }),
              ],
            },
            loader: require.resolve('postcss-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: 1,
              localIdentName: '[path]-[name]-[local]',
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-sass-each'),
                require('postcss-mixins'),
                require('postcss-import'),
                require('postcss-url')({
                  url: postcssUrlRebase,
                }),
                require('postcss-cssnext')({
                  // We don't transpile CSS variables module in Storybook
                  features: {
                    customProperties: false,
                  },
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
}
