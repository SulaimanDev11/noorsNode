const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const TTTransfer = sequelize.define('TTTransfer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    bank_used: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    erid: {//exchange rate id
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tt_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    tt_receipt_url: {
        type: DataTypes.TEXT,
        allowNull: true, // optional if receipt not uploaded yet
    },
    tt_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'TTTransfers',
    timestamps: true,
});


module.exports = TTTransfer;
