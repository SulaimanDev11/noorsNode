const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const RentalProperty = sequelize.define('RentalProperty', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,//who paid rent
        allowNull: false,
    },
    owned_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    source: {
        type: DataTypes.STRING,//Payable, Receivable
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(50), // e.g., "active", "not active",
        allowNull: false,
    },
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'RentalProperty',
    timestamps: true, // adds createdAt and updatedAt
});


module.exports = RentalProperty;
