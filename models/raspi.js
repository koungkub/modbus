'use strict';
module.exports = (sequelize, DataTypes) => {
  const Raspi = sequelize.define('Raspi', {
    mac_address: DataTypes.STRING,
    modbus_ip: DataTypes.STRING
  }, { underscored: true, tableName: 'Raspi' });
  Raspi.associate = function(models) {
    models.Raspi.hasMany(models.Channel, { onDelete: 'cascade' })

    models.Raspi.belongsTo(models.Factory, { onDelete: 'cascade' })
  };
  return Raspi;
};