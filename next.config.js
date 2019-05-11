require('dotenv').config()
const path = require('path')

const withPlugins = require('next-compose-plugins')
const Dotenv = require('dotenv-webpack')
const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')
module.exports = withPlugins([
withCss({
  cssModules: true
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
  ])