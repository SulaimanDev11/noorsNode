const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const ExchangeRates = sequelize.define('ExchangeRates', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    vendor_id: {//vendorId
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quote_rate: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: false,
    },
    quote_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'ExchangeRates',
    timestamps: true, // adds createdAt and updatedAt
});


module.exports = ExchangeRates;
