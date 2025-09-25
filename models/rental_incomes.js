const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const Rental = sequelize.define('Rental', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    pid: {//PropertyId
        type: DataTypes.INTEGER,//shopname/flat name
        allowNull: false,
    },
    tenant_name: {
        type: DataTypes.STRING,//who paid rent
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(12, 2),//amount
        allowNull: false,
    },
    received_in: {
        type: DataTypes.STRING,//where it was received
        allowNull: false,
    },
    income_date: {
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
    tableName: 'Rental',
    timestamps: true, // adds createdAt and updatedAt
});


module.exports = Rental;
