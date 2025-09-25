const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const AuctionVendors = sequelize.define('AuctionVendors', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(150),
        allowNull: true,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.INTEGER,//0,1
        allowNull: true,
    },
    uid: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'AuctionVendors',
    timestamps: true,
});

module.exports = AuctionVendors;
