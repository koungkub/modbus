'use strict';
module.exports = (sequelize, DataTypes) => {
  const Factory = sequelize.define('Factory', {
    factory: DataTypes.STRING
  }, { underscored: true, tableName: 'Factory' });
  Factory.associate = function(models) {
    models.Factory.hasMany(models.Raspi, { onDelete: 'cascade' })
  };
  return Factory;
};