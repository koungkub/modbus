const { validationResult, body, param } = require('express-validator/check')
const { Router } = require('express')
const models = require('../models')
const error = require('./error')
const factoryService = require('./service/factory')
const rpiService = require('./service/rpi')
const channelService = require('./service/channel')

const routes = Router()

/**
 * Finish
 */
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

/**
 * Finish
 */
routes.get('/factory/:id', [
  param('id', 'id was missing')
    .exists().not().isEmpty()
    .trim().escape()
], async (req, res ,next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }

  try {
    const factory = await factoryService.findFactory(req.params.id)
    if (factory === null) {
      next(error(422, 'Factory was exists !!'))
    } else {
      res
        .status(201)
        .json(factory)
    }
  } catch (e) {
    next(error(422, 'Factory was exists !!'))
  }
})

/**
 * Finish
 */
routes.post('/factory', [
  body('factory', 'factory was missing')
    .exists().not().isEmpty()
    .trim().escape(),
  body('name', 'name was missing')
    .exists().not().isEmpty()
    .trim().escape(),
  body('address', 'address was missing')
    .exists().not().isEmpty()
    .trim().escape(),
  body('tel', 'tel was missing')
    .exists().not().isEmpty()
    .trim().escape()
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }

  try {
    const { factory, name, address, tel } = req.body
    const create = await factoryService.createFactory(factory, name, address, tel)
    const factories = await factoryService.findFactory(create.id)
    res
      .status(201)
      .json(factories)
  } catch (e) {
    next(error(422, 'Factory was exists !!'))
  }
})

/**
 * Finish
 */
routes.put('/factory/:id', [
  body('factory', 'factory was missing')
    .exists().not().isEmpty()
    .trim().escape(),
  body('name', 'name was missing')
    .exists().not().isEmpty()
    .trim().escape(),
  body('address', 'address was missing')
    .exists().not().isEmpty()
    .trim().escape(),
  body('tel', 'tel was missing')
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
    const { factory, name, address, tel } = req.body
    const { id } = req.params

    const status = await factoryService.findFactory(id)

    if (status === null) {
      next(error(422, `Can not update factory`))
    } else {
      await factoryService.updateFactory(id, factory, name, address. tel)
      res
        .status(204)
        .json({})
    }
  } catch (e) {
    next(error(422, `Can not update factory`))
  }
})

/**
 * Finish
 */
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
    } else {
      next(error(422, `Can not delete factory`))
    }
  } catch (e) {
    next(error(422, `Can not delete factory`))
  }
})

/**
 * Finish
 * List All
 */
routes.get('/rpi', async (req, res, next) => {
  try {
    const listRaspi = await rpiService.listRpi()
    res
      .status(200)
      .json(listRaspi)
  } catch (e) {
    next(error(422, `Can not list raspi !!`))
  }
})

/**
 * Finish
 * edit response message
 */
routes.get('/factory/:fId/rpi/:rId', [
  param('fId', 'fId missing')
    .exists().not().isEmpty()
    .trim().escape(),
  param('rId', 'rId missing')
    .exists().not().isEmpty()
    .trim().escape()
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }

  try {
    const { fId, rId } = req.params
    const existsRpi = await rpiService.findRpi(rId)
    const existsFactory = await factoryService.findFactory(fId)
    if (existsFactory === null || existsRpi === null) {
      next(error(422, `Can not update raspi !!`))
    } else {
      const list = await rpiService.listRpiOfFactory(fId, rId)
      res
        .status(200)
        .json(list)
    }
  } catch (e) {
    next(error(422, `Can not update raspi !!`))
  }
})

/**
 * Finish
 */
routes.post('/rpi/:id', [
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
    const { id } = req.params
    const { modbus_ip, mac_address } = req.body
    await rpiService.createRpi(id, modbus_ip, mac_address)
    res
      .status(201)
      .json({
        message: 'Created'
      })
  } catch (e) {
    next(error(422, `Can not create raspi !!`))
  }
})

/**
 * Finish
 * Edit response message
 */
routes.put('/factory/:fId/rpi/:rId', [
  param('fId', 'fId missing')
    .exists().not().isEmpty()
    .trim().escape(),
  param('rId', 'rId missing')
    .exists().not().isEmpty()
    .trim().escape(),
  body('mac_address', 'mac_address missing')
    .exists().not().isEmpty()
    .trim().escape(),
  body('modbus_ip', 'modbus_ip missing')
    .exists().not().isEmpty()
    .trim().escape(),
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }

  try {
    const { fId, rId } = req.params
    const { mac_address, modbus_ip } = req.body
    const existsRpi = await rpiService.findRpi(rId)
    const existsFactory = await factoryService.findFactory(fId)
    if (existsFactory === null || existsRpi === null) {
      next(error(422, `Can not update raspi !!`))
    } else {
      await rpiService.updateRaspi(rId, modbus_ip, mac_address)
      res
        .status(204)
        .json()
    }
  } catch (e) {
    next(error(422, `Can not update raspi !!`))
  }
})

/**
 * Finish
 * Edit response message
 */
routes.delete('/factory/:fId/rpi/:rId', [
  param('fId', 'fId missing')
    .exists().not().isEmpty()
    .trim().escape(),
  param('rId', 'rId missing')
    .exists().not().isEmpty()
    .trim().escape(),
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }

  try {
    const { fId, rId } = req.params
    const existsRpi = await rpiService.findRpi(rId)
    const existsFactory = await factoryService.findFactory(fId)
    if (existsFactory === null || existsRpi === null) {
      next(error(422, `Can not update raspi !!`))
    } else {
      await rpiService.deleteRaspi(rId)
      res
        .status(204)
        .json()
    }
  } catch (e) {
    next(error(422, `Can not delete raspi !!`))
  }
})

// channel ------------------------------------------------------------
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

routes.put('/channel/:id', [
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
    const { channel, in_max, in_min, out_max, out_min } = req.body
    const status = await channelService.updateChannel(req.params.id, channel, in_max, in_min, out_max, out_min)
    if (status === 0) {
      next(error(422, `Can not add channel to raspi !!`))
    } else {
      res
        .status(204)
        .json()
    }
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
    } else {
      next(error(422, `Can not delete channel !!`))
    }
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
    const config = await rpiService.raspiGetConfig(req.params.mac)

    if (config === null) {
      next(error(422, `Can not get config !!`))
    } else {
      res
      .status(200)
      .json(config)
    }
  } catch (e) {
    next(error(422, `Can not get config !!`))
  }
})

module.exports = routes
