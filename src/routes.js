const { check, validationResult } = require('express-validator/check')
const { Router } = require('express')
const models = require('../models')

const routes = Router()

routes.get('/', (req, res, next) => {
    models.Factory.sync()
    models.Raspi.sync()
    models.Channel.sync()

    res.status(200).json({
        message: "Server is running"
    })
})

routes.get('/factory', (req, res, next) => {
    const data = []

    models.Factory.findAll({
        attributes: ['factory', 'id']
    }).then(infos => {
        res.json(infos)
    }).catch(e => {
        next({ message: "Query value fail", status: 400 })
    })
})


routes.post('/factory', [
    check('factory').exists()
], (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next({ message: "Factory not exists or invalid", status: 400})
    }
    
    models.Factory.create(req.body).then(info => {
        res.status(201).json({
            message: "Saved"
        })
    }).catch(e => {
        next({ message: "Insert value fail", status: 400 })
    })
})

routes.put('/factory/:id', [
    check('factory').exists()
], (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next({ message: "Factory not exists or invalid", status: 400})
    }

    models.Factory.update({
        factory: req.body.factory
    }, {
        where: {
            id: req.params.id
        }
    }).then(info => {
        res.status(200).json({
            message: "Updated"
        })
    }).catch(e => {
        next({ message: "Update value fail", status: 400 })
    })
})

routes.delete('/factory/:id', (req, res, next) => {
    models.Factory.destroy({
        where: {
            id: req.params.id
        }
    }).then(info => {
        res.status(204).json({
            message: "Deleted"
        })
    }).catch(e => {
        next({ message: "Detele value fail", status: 500 })
    })
})

routes.get('/raspi', (req, res, next) => {
    models.Factory.findAll({
        include: [ {
            model: models.Raspi,
            include: [
                {
                    model: models.Channel,
                    attributes: ['id', 'channel', 'in_max', 'in_min', 'out_max', 'out_min']
                }
            ],
            attributes: ['id', 'mac_address', 'modbus_ip']
        } ],
        attributes: ['id', 'factory']
    }).then(infos => {
        res.json(infos)
    }).catch(e => {
        next({ message: 'Query data fail', status: 400 })
    })
})

routes.post('/raspi/:id', [
    check('mac_address').exists(),
    check('modbus_ip').exists()
], (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next({ message: "Body not exists or invalid", status: 400})
    }

    req.body.factory_id = req.params.id

    models.Raspi.create(req.body).then(() => {
        res.status(201).json({
            message: "Saved"
        })
    }).catch(e => {
        next({ message: "Insert value fail", status: 400 })
    })
})

routes.post('/channel/:id', [
    check('channel').exists(),
    check('in_max').exists(),
    check('in_min').exists(),
    check('out_max').exists(),
    check('out_min').exists()
], (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next({ message: "Body not exists or invalid", status: 400})
    }

    req.body.raspi_id = req.params.id

    models.Channel.create(req.body).then(() => {
        res.status(201).json({ message: "Saved" })
    }).catch(e => {
        next({ message: "Channel must be unique !!", status: 400 })
    })
})

routes.delete('/raspi/:id', (req, res, next) => {
    models.Raspi.destroy({
        where: {
            id: req.params.id
        }
    }).then(info => {
        res.status(204).json({
            message: "Deleted"
        }).status(204)
    }).catch(e => {
        next({ message: "Delete value fail", status: 500 })
    })
})

routes.delete('/channel/:id', (req, res, next) => {
    models.Channel.destroy({
        where: {
            id: req.params.id
        }
    }).then(info => {
        res.status(204).json({
            message: "Deleted"
        }).status(204)
    }).catch(e => {
        next({ message: "Delete value fail", status: 500 })
    })
})

routes.get('/config/:mac', (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next({ message: "Body not exists or invalid", status: 400})
    }

    models.Raspi.findOne({
        where: { mac_address: req.params.mac },
        include: { model: models.Channel, attributes: ['channel', 'in_max', 'in_min', 'out_max', 'out_min']},
        attributes: ['modbus_ip']
    }).then(info => {
        if (info === null) {
            res.status(400).json()
        } else {
            res.json(info).status(200)
        }
    }).catch(e => {
        next({ message: "Fail to get config", status: 500 })
    })
})

routes.put('/raspi/:id', [
    check('modbus_ip').exists()
], (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next({ message: "Body not exists or invalid", status: 400})
    }

    models.Raspi.update({
        modbus_ip: req.body.modbus_ip
    }, {
        where: {
            id: req.params.id
        }
    }).then(info => {
        res.status(200).json({ message: "Updated" })
    }).catch(e => {
        next({ message: "Update value fail", status: 400 })
    })
})

module.exports = routes
