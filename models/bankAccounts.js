const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const BankAccount = sequelize.define('BankAccount', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,//Asset, other
        allowNull: false
    },
    account_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'BankAccounts',
    timestamps: true
});

module.exports = BankAccount;