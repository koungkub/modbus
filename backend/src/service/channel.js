const models = require('../../models')

module.exports = {
  async createChannel(rpi_id, channels) {
    const { channel, in_max, in_min, out_max, out_min } = channels

    return await models.Channel.create({
      rpi_id,
      channel,
      in_max,
      in_min,
      out_max,
      out_min
    })
  },
  async updateChannel(id, channel, in_max, in_min, out_max, out_min) {
    return await models.Channel.update({
      channel,
      in_max,
      in_min,
      out_max,
      out_min
    }, {
      where: {
        id
      }
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