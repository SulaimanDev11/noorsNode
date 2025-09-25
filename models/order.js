const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    cid: {
        type: DataTypes.INTEGER,
        allowNull: false, // customer id
    },
    total_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
    },
    discount_amount: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0,
        allowNull: true,
    },
    paid_amount: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0,
        allowNull: true,
    },
    net_amount: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    order_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.STRING(50), // "pending", "paid", "partial", "cancelled"
        allowNull: true,
        defaultValue: "pending",
    },
    uid: {
        type: DataTypes.INTEGER, // created by (user/staff)
        allowNull: false,
    },
}, {
    tableName: 'Orders',
    timestamps: true,
});

module.exports = Order;
