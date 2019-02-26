const next = require('next');
const express = require('express');
const csrf = require('csurf');
var bodyParser = require('body-parser')
require('dotenv').load()

var csrfProtection = csrf({ cookie: true })

process.on('uncaughtException', function(err) {
    console.error('Uncaught Exception: ', err)
  })
  
  process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection: Promise:', p, 'Reason:', reason)
  })
  
  // Default when run with `npm start` is 'production' and default port is '80'
  // `npm run dev` defaults mode to 'development' & port to '3000'
  process.env.NODE_ENV = process.env.NODE_ENV || 'production'
  process.env.PORT = process.env.PORT || 80
  
  // Initialize Next.js
  const app = next({
    dir: '.',
    dev: (process.env.NODE_ENV === 'development')
  })

  app.prepare().then(() => {
    const server = express()
    const middlewares = [
      bodyParser.urlencoded(),
      bodyParser.json()

      //cookieParser('sesh-dash'),
      //csrfProtection
    ]
    server.use(middlewares)    

    server.all('*', (req, res) => {
        let nextRequestHandler = app.getRequestHandler()
        return nextRequestHandler(req, res)
      })

    server.listen(process.env.PORT, err => {
        if (err) {
          throw err
        }
        console.log('> Ready on http://localhost:' + process.env.PORT + ' [' + process.env.NODE_ENV + ']')
      })

    }).catch(err => {
        console.log('An error occurred, unable to start the server')
        console.log(err)
      })



