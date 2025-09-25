const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const Transactions = sequelize.define('Transactions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM('income', 'expense'),
        allowNull: true,
    },
    source: {
        type: DataTypes.STRING(50), // e.g. 'order_payment', 'refund', 'bank_fee', 'manual_adjustment'
        allowNull: true,
    },
    amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
    },
    reference_table: {
        type: DataTypes.STRING,
        allowNull: true
    },
    reference_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    transaction_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
    },
    payment_method: {
        type: DataTypes.STRING(50), // e.g., 'cash', 'bank', 'credit', 'stripe'
        allowNull: true,
    },
    received_by_uid: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    uid: {
        type: DataTypes.INTEGER, // created by (user/staff)
        allowNull: true,
    },
}, {
    tableName: 'Transactions',
    timestamps: true,
});

module.exports = Transactions;