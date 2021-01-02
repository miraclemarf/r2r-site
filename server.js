const next = require('next');
const jsonServer = require('json-server')
const express = require('express');
const csrf = require('csurf');
var bodyParser = require('body-parser')
require('dotenv').load()

var csrfProtection = csrf({ cookie: true })

process.on('uncaughtException', function (err) {
  console.error('Uncaught Exception: ', err)
})

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection: Promise:', p, 'Reason:', reason)
})

// Default when run with `npm start` is 'production' and default port is '80'
// `npm run dev` defaults mode to 'development' & port to '3000'
process.env.NODE_ENV = process.env.NODE_ENV || 'production'
process.env.PORT = process.env.PORT || 80



const router = jsonServer.router('db.json')
//const middlewares = jsonServer.defaults()


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

  server.use((req, res, next) => {
    if (req.method === 'POST') {
      req.body.createdAt = Date.now()
    }
    // Continue to JSON Server router
    next()
  })


  // Use default router
  server.use('/api', router)

  server.get('/', (req, res) => {
    const actualPage = '/index'
    return app.render(req, res, actualPage)
  })

  // Testimonial Scope
  server.get('/testimonial/:id', (req, res) => {
    const actualPage = '/testimonial/detail'
    const queryParams = { id: req.params.id }
    return app.render(req, res, actualPage, queryParams)
  })

  // Gallery Index
  server.get('/gallery', (req, res) => {
    const actualPage = '/gallery/landing'
    return app.render(req, res, actualPage)
  })

  server.get('/gallery/:id', (req, res) => {
    const actualPage = '/gallery/detail'
    const queryParams = { id: req.params.id }
    return app.render(req, res, actualPage, queryParams)
  })

  // Trip Scope
  server.get('/trips', (req, res) => {
    const actualPage = '/trip/landing'
    return app.render(req, res, actualPage)
  })

  server.get('/trip/:id', (req, res) => {
    const actualPage = '/trip/detail'
    const queryParams = { id: req.params.id }
    return app.render(req, res, actualPage, queryParams)
  })

  server.get('/trip/:id/:page', (req, res) => {
    const queryParams = {  id: req.params.id, page: req.params.page }
    const actualPage = '/transaction/'+queryParams.page
    return app.render(req, res, actualPage, queryParams)
  })

  // How It Works Scope
  server.get('/how-it-works', (req, res) => {
    const actualPage = '/howItWorks'
    return app.render(req, res, actualPage)
  })

  // T & C Scope
  server.get('/term-condition', (req, res) => {
    const actualPage = '/tnc'
    return app.render(req, res, actualPage)
  })

  // Scope User
  server.get('/user/trip/:id', (req, res) => {
    const actualPage = '/user/detailTrip'
    const queryParams = { id: req.params.id }
    return app.render(req, res, actualPage, queryParams)
  })

  server.get('/user/trip/:id/request', (req, res) => {
    const actualPage = '/user/request'
    const queryParams = { id: req.params.id }
    return app.render(req, res, actualPage, queryParams)
  })
  server.get('/verification/:code', (req, res) => {
    const actualPage = '/verification'
    const queryParams = { code: req.params.code }
    return app.render(req, res, actualPage, queryParams)
  })

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



