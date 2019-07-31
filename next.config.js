require('dotenv').config()
const path = require('path')
const Dotenv = require('dotenv-webpack')
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
      ]
      return config
    }
  }
))
