'use strict'
module.exports = (sequelize, DataTypes) => {
  const Rpi = sequelize.define('Rpi', {
    mac_address: DataTypes.STRING,
    modbus_ip: DataTypes.STRING
  }, {
    underscored: true,
    tableName: 'Rpi'
  })
  Rpi.associate = function(models) {
    models.Rpi.hasMany(models.Channel, { onDelete: 'cascade' })

    models.Rpi.belongsTo(models.Factory, { onDelete: 'cascade' })
  }
  return Rpi
}
