const models = require('../../models')

module.exports = {
  async createRaspi(factory, modbusIp, macAddress) {
    return await models.Raspi.create({
      factory_id: factory,
      mac_address: macAddress,
      modbus_ip: modbusIp
    })
  },
  async listRaspi() {
    return await models.Factory.findAll({
      include: [
        {
          model: models.Raspi,
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
  async updateRaspi(id, modbusIp) {
    return await models.Raspi.update({
      modbus_ip: modbusIp
    }, {
      where: {
        id
      }
    })
  },
  async deleteRaspi(id) {
    return await models.Raspi.destroy({
      where: {
        id
      }
    })
  },
  async raspiGetConfig(macAddress) {
    return await models.Raspi.findOne({
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
