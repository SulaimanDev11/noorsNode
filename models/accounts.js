const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');
const Accounts = sequelize.define('Accounts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: true,
    },
    type: {
        type: DataTypes.STRING(150),
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    account_title: {
        type: DataTypes.STRING,
        defaultValue: 'ABC',
        allowNull: true
    },
    account_number: {
        type: DataTypes.STRING,
        defaultValue: '123',
        allowNull: true
    },
    uid: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'Accounts',
    timestamps: true,
});

module.exports = Accounts;
