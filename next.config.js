require('dotenv').config()
const path = require('path')
const Dotenv = require('dotenv-webpack')
const withSass = require('@zeit/next-sass')
module.exports = withSass(
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
