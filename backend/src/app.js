const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const morgan = require('morgan')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header("Access-Control-Allow-Methods", 'GET,HEAD,OPTIONS,POST,PUT')
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
  next()
})

app.use(routes)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  err.message = "Not Found"
  next(err)
})

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({
      message: err.message || 'Internal Server Error'
    })
})

module.exports = app
