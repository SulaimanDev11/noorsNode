const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const ExchangeQuote = sequelize.define('ExchangeQuote', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    vendor_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'ExchangeQuotes',
    timestamps: true, // adds createdAt and updatedAt
});


module.exports = ExchangeQuote;
