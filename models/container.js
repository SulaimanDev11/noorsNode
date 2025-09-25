const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const Container = sequelize.define('Container', {
    container_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    container_number: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    bl_number: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    departure_port: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    destination_port: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    departure_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    arrival_date: {
        type: DataTypes.DATEONLY,
        allowNull: true, // might not be arrived yet
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(50), // e.g., "Empty", "On the Way", "Arrived", "Cleared", "Surrender"
        allowNull: false,
    },
}, {
    tableName: 'Containers',
    timestamps: true, // createdAt, updatedAt
});

module.exports = Container;
