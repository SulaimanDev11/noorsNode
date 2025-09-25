const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    password_hash: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING(50), // e.g. admin, employee, user
        allowNull: true,
    },
    position: {
        type: DataTypes.STRING(50), // e.g. Chariman, CEO, Director, Chief, Incharge, Sanitary, user
        allowNull: true,
    },
    salary: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
    },
    passport: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    cnic: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    uid: {
        type: DataTypes.INTEGER, // created by (user/staff)
        allowNull: true,
    },
}, {
    tableName: 'Users',
    timestamps: true, // Automatically adds createdAt and updatedAt
});

module.exports = User;
