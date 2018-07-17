module.exports = (sequelize, DataTypes) => {
    const Factory = sequelize.define('Factory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        factory: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    },
    { underscored: true, tableName: "factory" })

    Factory.associate = function(models) {
        models.Factory.hasMany(models.Raspi, { onDelete: 'cascade' })
    }
    return Factory
}