const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const morgan = require('morgan')

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

if (process.env.NODE_ENV === 'dev')
    app.use(morgan('dev'))

app.use('/', routes)

app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    err.data = [
        { page: "Now Found" }
    ]
    next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err)
})

module.exports = app