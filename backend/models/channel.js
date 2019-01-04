'use strict'
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    channel: DataTypes.INTEGER,
    in_max: DataTypes.FLOAT,
    in_min: DataTypes.FLOAT,
    out_max: DataTypes.FLOAT,
    out_min: DataTypes.FLOAT
  }, {
    underscored: true,
    tableName: 'Channel'
  })
  Channel.associate = function(models) {
    models.Channel.belongsTo(models.Rpi, { onDelete: 'cascade' })
  }
  return Channel
}
