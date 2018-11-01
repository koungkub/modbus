const models = require('../../models')

module.exports = {
  async createFactory(factory) {
    return await models.Factory.create({
      factory
    })
  },
  async findExistsFactoryName(factory) {
    const isExist = await models.Factory.findOne({
      where: {
        factory
      }
    })

    if (isExist) {
      return true
    }
    return false
  },
  async listFactory() {
    return await models.Factory.findAll({
      attributes: [
        'id',
        'factory'
      ]
    })
  },
  async updateFactory(id, factory) {
    await models.Factory.update({
      factory
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
