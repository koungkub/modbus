const { validationResult, body, param } = require('express-validator/check')
const { Router } = require('express')
const models = require('../models')
const error = require('./error')
const factoryService = require('./service/factory')
const raspiService = require('./service/raspi')
const channelService = require('./service/channel')

const routes = Router()

routes.get('/', (req, res, next) => {
  res
    .status(200)
    .json({
      message: "Server is running"
    })
})

routes.get('/factory', async (req, res, next) => {
  try {
    const listFactory = await factoryService.listFactory()
    res
      .status(200)
      .json(listFactory)
  } catch (e) {
    next(error(422, 'Can not list factory'))
  }
})


routes.post('/factory', [
  body('factory', 'factory was missing')
    .exists().not().isEmpty()
    .trim().escape()
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }

  try {
    if (await factoryService.findExistsFactoryName(req.body.factory)) {
      next(error(422, 'Factory was exists !!'))
    } else {
      await factoryService.createFactory(req.body.factory)
      res
        .status(201)
        .json({
          message: 'Created'
        })
    }
  } catch (e) {
    next(error(422, 'Factory was exists !!'))
  }
})

routes.put('/factory/:id', [
  body('factory', 'new facetory name was missing')
    .exists().not().isEmpty()
    .trim().escape(),
  param('id', 'id was missing')
    .exists().not().isEmpty()
    .trim().escape()
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }
  try {
    if (await factoryService.findExistsFactoryName(req.body.factory)) {
      next(error(422, `Can not update factory`))
    } else {
      await factoryService.updateFactory(req.params.id, req.body.factory)
      res
        .status(204)
        .json()
    }
  } catch (e) {
    next(error(422, `Can not update factory`))
  }
})

routes.delete('/factory/:id', [
  param('id', 'id missing')
    .exists().not().isEmpty()
    .trim().escape()
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }

  try {
    const status = await factoryService.deleteFactory(req.params.id)
    if (status === 1) {
      res
      .status(204)
      .json()
    }
    next(error(422, `Can not delete factory`))
  } catch (e) {
    next(error(422, `Can not delete factory`))
  }
})

routes.get('/raspi', async (req, res, next) => {
  try {
    const listRaspi = await raspiService.listRaspi()
    res
      .status(200)
      .json(listRaspi)
  } catch (e) {
    next(error(422, `Can not list raspi !!`))
  }
})

routes.post('/raspi/:id', [
  body('mac_address', 'mac_address missing')
    .exists().not().isEmpty()
    .trim().escape(),
  body('modbus_ip', 'modbus_ip missing')
    .exists().not().isEmpty()
    .trim().escape(),
  param('id', 'id missing')
    .exists().not().isEmpty()
    .trim().escape()
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }

  try {
    await raspiService.createRaspi(req.params.id, req.body.modbus_ip, req.body.mac_address)
    res
      .status(201)
      .json({
        message: 'Created'
      })
  } catch (e) {
    next(error(422, `Can not create raspi !!`))
  }
})

routes.put('/raspi/:id', [
  body('modbus_ip', 'modbus_ip missing')
    .exists().not().isEmpty()
    .trim().escape(),
  param('id', 'id raspi missing')
    .exists().not().isEmpty()
    .trim().escape()
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }

  try {
    const status = await raspiService.updateRaspi(req.params.id, req.body.modbus_ip)

    if (status === 1) {
      res
      .status(204)
      .json()
    }
    next(error(422, `Can not update raspi !!`))
  } catch (e) {
    next(error(422, `Can not update raspi !!`))
  }
})

routes.delete('/raspi/:id', [
  param('id', 'id raspi missing')
    .exists().not().isEmpty()
    .trim().escape()
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }

  try {
    const status = await raspiService.deleteRaspi(req.params.id)
    if (status === 1) {
      res
      .status(204)
      .json()
    }
    next(error(422, `Can not delete raspi !!`))
  } catch (e) {
    next(error(422, `Can not delete raspi !!`))
  }
})

routes.post('/channel/:id', [
  body('channel', 'channel missing')
    .exists().not().isEmpty()
    .trim().escape(),
  body('in_max', 'in_max missing')
    .exists().not().isEmpty()
    .trim().escape(),
  body('in_min', 'in_min missing')
    .exists().not().isEmpty()
    .trim().escape(),
  body('out_max', 'out_max missing')
    .exists().not().isEmpty()
    .trim().escape(),
  body('out_min', 'out_min missing')
    .exists().not().isEmpty()
    .trim().escape(),
  param('id', 'id raspi missing')
    .exists().not().isEmpty()
    .trim().escape()
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }

  try {
    await channelService.createChannel(req.params.id, req.body)
    res
      .status(201)
      .json({
        message: 'Created'
      })
  } catch (e) {
    next(error(422, `Can not add channel to raspi !!`))
  }
})

routes.delete('/channel/:id', [
  param('id', 'id missing')
    .exists().not().isEmpty()
    .trim().escape()
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }

  try {
    const status = await channelService.deleteChannel(req.params.id)
    
    if (status === 1) {
      res
      .status(204)
      .json()
    }
    next(error(422, `Can not delete channel !!`))
  } catch (e) {
    next(error(422, `Can not delete channel !!`))
  }
})

routes.get('/config/:mac', [
  param('mac', 'mac missing')
    .exists().not().isEmpty()
    .trim().escape()
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }

  try {
    const config = await raspiService.raspiGetConfig(req.params.mac)

    if (config === null) {
      next(error(422, `Can not get config !!`))
    } else {
      res
      .status(200)
      .json(config)
    }
  } catch (e) {
    console.log(e)
    next(error(422, `Can not get config !!`))
  }
})

module.exports = routes
