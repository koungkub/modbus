module.exports = (sequelize, DataTypes) => {
    const Merchant = sequelize.define('Merchant', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        address: DataTypes.TEXT,
        province: DataTypes.STRING,
        postcode: DataTypes.STRING,
        mobile: DataTypes.STRING,
        remember_token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE
    })

    Merchant.associate = function(models) {
        // models.Merchant.hasMany(models.Item, {foreignKey: 'merchantId'})

        // models.Merchant.hasMany(models.Shipping, {foreignKey: 'merchantId'})

        // models.Merchant.hasMany(models.Order, {foreignKey: 'merchantId'})

        // models.Merchant.hasMany(models.Confirm_Payment, {foreignKey: 'merchantId'})
    }
    return Merchant
}