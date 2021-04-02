const ImageminPlugin = require('imagemin-webpack-plugin').default
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  configureWebpack: {
    plugins: [
      // Make sure that the plugin is after any plugins that add images
      new ImageminPlugin({
        disable: process.env.NODE_ENV !== 'production', // Disable during development
        pngquant: {
          quality: '50'
        }
      }),
      new BundleAnalyzerPlugin()
    ]
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/portfolioV2/'
    : '/'
}
