const { validationResult, body, param } = require('express-validator/check')
const { Router } = require('express')
const models = require('../models')
const error = require('./error')

const routes = Router()

routes.get('/', (req, res, next) => {
  res
    .status(200)
    .json({
      message: "Server is running"
    })
})

routes.get('/factory', (req, res, next) => {
  models.Factory.findAll({
    attributes: [
      'id',
      'factory'
    ]
  }).then(infos => {
    res
      .status(200)  
      .json(infos)
  }).catch(e => {
    next(error(422, `Can't list factory owner`))
  })
})


routes.post('/factory', [
  body('factory', 'factory name missing')
    .exists().not().isEmpty()
    .trim().escape()
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }
  
  models.Factory.create(req.body).then(info => {
    res
      .status(201)
      .json({
        message: "Saved"
      })
  }).catch(e => {
    next(error(422, `Factory name was exist!!`))
  })
})

routes.put('/factory/:id', [
  body('factory', 'new facetory name missing')
    .exists().not().isEmpty()
    .trim().escape(),
  param('id', 'id missing')
    .exists().not().isEmpty()
    .trim().escape()
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }

  models.Factory.update({
    factory: req.body.factory
  }, {
    where: {
      id: req.params.id
    }
  }).then(info => {
    res
      .status(204)
  }).catch(e => {
    next(error(422, `id not found`))
  })
})

routes.delete('/factory/:id', [
  param('id', 'id missing')
    .exists().not().isEmpty()
    .trim().escape()
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }

  models.Factory.destroy({
    where: {
      id: req.params.id
    }
  }).then(info => {
    res
      .status(204)
  }).catch(e => {
    next(error(422, `id not found`))
  })
})

routes.get('/raspi', (req, res, next) => {
  models.Factory.findAll({
    include: [ 
      {
        model: models.Raspi,
        include: [
          {
            model: models.Channel,
            attributes: ['id', 'channel', 'in_max', 'in_min', 'out_max', 'out_min']
          }
        ],
        attributes: ['id', 'mac_address', 'modbus_ip']
      } 
    ],
    attributes: ['id', 'factory']
  }).then(infos => {
    res
      .status(200)
      .json(infos)
  }).catch(e => {
    next(error(422, `Can't get raspberry pi`))
  })
})

routes.post('/raspi/:id', [
  body('mac_address', 'mac_address missing')
    .exists().not().isEmpty()
    .trim().escape(),
  body('modbus_ip', 'modbus_ip missing')
    .exists().not().isEmpty()
    .trim().escape()
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }

  req.body.factory_id = req.params.id

  models.Raspi.create(req.body).then(() => {
    res
      .status(201)
      .json({
        message: "Saved"
      })
  }).catch(e => {
    next(error(422, `Can't add raspberry to factory`))
  })
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
    .trim().escape()
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }

  req.body.raspi_id = req.params.id

  models.Channel.create(req.body).then(() => {
    res
      .status(201)
      .json({
        message: "Saved"
      })
  }).catch(e => {
    next(error(422, `Can't add channel to raspberry pi`))
  })
})

routes.delete('/raspi/:id', [
  param('id', 'id raspi missing')
    .exists().not().isEmpty()
    .trim().escape()
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }

  models.Raspi.destroy({
    where: {
      id: req.params.id
    }
  }).then(info => {
    res
      .status(204)
  }).catch(e => {
    next(error(422, `Can't delete raspberry pi`))
  })
})

routes.delete('/channel/:id', [
  param('id', 'id missing')
    .exists().not().isEmpty()
    .trim().escape()
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }

  models.Channel.destroy({
    where: {
      id: req.params.id
    }
  }).then(info => {
    res
      .status(204)
  }).catch(e => {
    next(error(422, `Can't delete channel from raspberry pi`))
  })
})

routes.get('/config/:mac', (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }

  models.Raspi.findOne({
    where: { mac_address: req.params.mac },
    include: { model: models.Channel, attributes: ['channel', 'in_max', 'in_min', 'out_max', 'out_min']},
    attributes: ['modbus_ip']
  }).then(info => {
    if (info === null) {
      res
        .status(422)
        .json()
    } else {
      res
        .status(200)
        .json(info)
    }
  }).catch(e => {
    next(error(422, `Can't get config`))
  })
})

routes.put('/raspi/:id', [
  body('modbus_ip', 'modbus_ip missing')
    .exists().not().isEmpty()
    .trim().escape()
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }

  models.Raspi.update({
    modbus_ip: req.body.modbus_ip
  }, {
    where: {
      id: req.params.id
    }
  }).then(info => {
    res
      .status(200)
      .json({
        message: "Updated" 
      })
  }).catch(e => {
    next(error(422, `Can't update raspberry pi`))
  })
})

module.exports = routes
