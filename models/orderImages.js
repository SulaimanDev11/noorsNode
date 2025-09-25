const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const OrderImages = sequelize.define('OrderImages', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    oid: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    path: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    step: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'OrderImages',
    timestamps: true, // Adds createdAt and updatedAt
});


module.exports = OrderImages;
