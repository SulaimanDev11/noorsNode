const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const Ledger = sequelize.define('Ledger', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    entry_type: {
        type: DataTypes.STRING,
        allowNull: true
    }, // 'credit' or 'debit'
    amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true
    },
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    transaction_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    reference_table: {
        type: DataTypes.STRING,
        allowNull: true
    },
    reference_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    party_type: {//'customer' | 'vendor',
        type: DataTypes.STRING,
        allowNull: true
    },
    party_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    source: {
        type: DataTypes.STRING,
        allowNull: true
    }, // Bank name or 'Locker'
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    entry_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    uid: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, {
    tableName: 'Ledger',
    timestamps: true
});

module.exports = Ledger;
