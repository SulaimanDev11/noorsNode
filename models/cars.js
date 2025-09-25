const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const Car = sequelize.define('Car', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    auction_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    make: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    chassis_number: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    purchase_price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    purchase_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(50), // e.g., "auctioned", "dismantled", "shipped"
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Cars',
    timestamps: true, // Adds createdAt and updatedAt
});

module.exports = Car;
