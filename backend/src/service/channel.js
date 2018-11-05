const models = require('../../models')

module.exports = {
  async createChannel(id, channels) {
    const { channel, in_max, in_min, out_max, out_min } = channels

    return await models.Channel.create({
      raspi_id: id,
      channel,
      in_max,
      in_min,
      out_max,
      out_min
    })
  },
  async deleteChannel(id) {
    return await models.Channel.destroy({
      where: {
        id
      }
    })
  }
}