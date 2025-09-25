const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const ContainerImages = sequelize.define('ContainerImages', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    cid: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    type: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    path: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    step: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    uid: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'ContainerImages',
    timestamps: true, // Adds createdAt and updatedAt
});


module.exports = ContainerImages;
