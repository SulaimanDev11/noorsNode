const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const Expenses = sequelize.define('Expenses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    category: {
        type: DataTypes.STRING,//groceries, trasnport, tickets, home, other
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    paid_from: {
        type: DataTypes.STRING,//Locker, Bank
        defaultValue: 0,
        allowNull: false,
    },
    expense_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(50), // e.g., "pending", "paid", "partial", "cancelled"
        allowNull: false,
    },
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Expenses',
    timestamps: true, // adds createdAt and updatedAt
});


module.exports = Expenses;
