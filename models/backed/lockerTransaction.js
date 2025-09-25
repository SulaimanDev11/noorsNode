const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db.js');

const LockerTransaction = sequelize.define('LockerTransaction', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    order_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Orders',
            key: 'id',
        },
    },
    amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    deposited_by: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'LockerTransactions',
    timestamps: true, // createdAt and updatedAt
});

LockerTransaction.associate = (models) => {
    LockerTransaction.belongsTo(models.Order, { foreignKey: 'order_id' });
    LockerTransaction.belongsTo(models.User, { foreignKey: 'deposited_by' });
};

module.exports = LockerTransaction;
