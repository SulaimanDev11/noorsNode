const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const CarImages = sequelize.define('CarImages', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    cid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    path: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'CarImages',
    timestamps: true, // Adds createdAt and updatedAt
});


module.exports = CarImages;
