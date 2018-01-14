const { Router } = require('express')
const { check, validationResult } = require('express-validator/check')
const jsonwebtoken = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const bcrypt = require('bcrypt')
const models = require('../model')

const routes = Router()

const errorHandle = (status, data) => {
    const err = new Error()
    err.status = status
    err.data = [ data ]
    return err
}

routes.get('/', (req, res, next) => {
    res.json({ status: 200 })
})

routes.post('/test', [
    check('id', 'Invalid id').exists()
], jwt({ secret: process.env.TOKEN_KEY }), (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(errorHandle(400, errors.mapped()))
    }
    res.json({ status: 200 })
})
module.exports = routes