module.exports = (sequelize, DataTypes) => {
    const Raspi = sequelize.define('Raspi', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        mac_address: { type: DataTypes.STRING, unique: true},
        modbus_ip: DataTypes.STRING,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    },
    { underscored: true, tableName: "raspi" })

    Raspi.associate = function(models) {
        models.Raspi.hasMany(models.Channel, { onDelete: 'cascade' })

        models.Raspi.belongsTo(models.Factory, { onDelete: 'cascade' })
    }
    return Raspi
}
