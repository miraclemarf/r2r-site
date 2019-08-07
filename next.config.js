require('dotenv').config()
const path = require('path')
const Dotenv = require('dotenv-webpack')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')

module.exports = withCss(withSass(
  {
    sassLoaderOptions: {
      data: "$env: '" + process.env.HOST_DOMAIN + "';"
    },
    assetPrefix: process.env.HOST_DOMAIN,
    webpack: (config, { dev }) => {
      config.plugins = config.plugins || []

      config.plugins = [
        ...config.plugins,
        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, '.env'),
          systemvars: true
        }),
        new WebpackPwaManifest({
          filename: 'static/manifest.json',
          name: 'Road2Ring',
          short_name: 'R2R',
          description: 'Road 2 Ring',
          orientation: 'portrait',
          start_url: '/',
          display: 'standalone',
          theme_color: '#FFFFFF',
          background_color: '#FFFFFF',
          inject: true,
          fingerprints: false,
          publicPath: '..',
          includeDirectory: true,
          icons: [
            {
              src: path.resolve('static/slicing/icon/icon_r2r.png'),
              sizes: [16, 32, 48, 57, 60, 72, 76, 96, 114, 120, 144, 152, 180, 192],
              type: 'image\/png',
              destination: path.join('static/icons', '')
            }
          ]
        })
      ]
      return config
    }
  }
))
