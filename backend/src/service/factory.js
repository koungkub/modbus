const models = require('../../models')

module.exports = {
  async createFactory(factory, name, address, tel) {
    return await models.Factory.create({
      factory,
      name,
      address,
      tel,
    },)
  },
  async findFactory(id) {
    return await models.Factory.findById(id, {
      attributes: [ 'factory', 'name', 'address', 'tel' ]
    })
  },
  async listFactory() {
    return await models.Factory.findAll({
      attributes: [ 'id', 'factory', 'name', 'address', 'tel' ]
    })
  },
  async updateFactory(id, factory, name, address, tel) {
    await models.Factory.update({
      factory,
      name,
      address,
      tel
    }, {
      where: {
        id
      }
    })
  },
  async deleteFactory(id) {
    return await models.Factory.destroy({
      where: {
        id
      }
    })
  }
}
