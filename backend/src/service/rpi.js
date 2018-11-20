const models = require('../../models')

module.exports = {
  async createRpi(factory, modbusIp, macAddress) {
    return await models.Rpi.create({
      factory_id: factory,
      mac_address: macAddress,
      modbus_ip: modbusIp
    })
  },
  async listRpi() {
    return await models.Factory.findAll({
      include: [
        {
          model: models.Rpi,
          include: [
            {
              model: models.Channel,
              attributes: [ 'id', 'channel', 'in_max', 'in_min', 'out_max', 'out_min' ]
            }
          ],
          attributes: [ 'id', 'mac_address', 'modbus_ip' ]
        }
      ],
      attributes: [ 'id', 'factory' ]
    })
  },
  async findRpi(id) {
    return await models.Rpi.findById(id, {
      attributes: [ 'id', 'modbus_ip', 'mac_address' ]
    })
  },
  async listRpiOfFactory(fId, rId) {
    return await models.Factory.findOne({
      where: {
        id: fId
      },
      attributes: [ 'factory', 'name', 'address', 'tel' ],
      include: {
        model: models.Rpi,
        attributes: [ 'mac_address', 'modbus_ip' ],
        where: {
          id: rId
        }
      }
    })
  },
  async updateRaspi(id, modbus_ip, mac_address) {
    return await models.Rpi.update({
      modbus_ip,
      mac_address
    }, {
      where: {
        id
      }
    })
  },
  async deleteRaspi(id) {
    return await models.Rpi.destroy({
      where: {
        id
      }
    })
  },
  async raspiGetConfig(macAddress) {
    return await models.Rpi.findOne({
      where: {
        mac_address: macAddress
      },
      include: {
        model: models.Channel,
        attributes: [ 'channel', 'in_max', 'in_min', 'out_max', 'out_min' ]
      },
      attributes: [ 'modbus_ip' ]
    })
  }
}
