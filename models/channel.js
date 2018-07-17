module.exports = (sequelize, DataTypes) => {
    const Channel = sequelize.define('Channel', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        channel: { type: DataTypes.INTEGER, unique: true },
        in_max: DataTypes.FLOAT,
        in_min: DataTypes.FLOAT,
        out_max: DataTypes.FLOAT,
        out_min: DataTypes.FLOAT,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    },
    { underscored: true, tableName: "channel" })

    Channel.associate = function(models) {
        models.Channel.belongsTo(models.Raspi, { onDelete: 'cascade' })
    }
    return Channel
}
