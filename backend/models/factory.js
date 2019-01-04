'use strict'
module.exports = (sequelize, DataTypes) => {
  const Factory = sequelize.define('Factory', {
    factory: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    tel: DataTypes.STRING
  }, { 
    underscored: true, 
    tableName: 'Factory'
  })
  Factory.associate = function(models) {
    models.Factory.hasMany(models.Rpi, { onDelete: 'cascade' })
  }
  return Factory
}
