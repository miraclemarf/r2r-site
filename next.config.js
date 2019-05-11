require('dotenv').config()
const path = require('path')
const Dotenv = require('dotenv-webpack')
const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')
module.exports = 
withCss({
  webpack: function (config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    }),
withSass(
    {
      
      assetPrefix: process.env.HOST_DOMAIN,
      publicRuntimeConfig: { 
        staticFolder: `${process.env.HOST_DOMAIN}/static`
      },
      webpack: (config, { dev }) => {

        
        config.plugins = config.plugins || []
      
        config.plugins = [
          ...config.plugins,
    
          // Read the .env file
          new Dotenv({
            path: path.join(__dirname, '.env'),
            systemvars: true
          })
        ]
        return config
    }}
)
