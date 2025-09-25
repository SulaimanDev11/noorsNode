const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const ExpenseCategory = sequelize.define('ExpenseCategory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,//groceries, trasnport, tickets, home, other
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(50), // e.g., active, notactive
        allowNull: false,
    },
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'ExpenseCategory',
    timestamps: true, // adds createdAt and updatedAt
});


module.exports = ExpenseCategory;
