// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/db.js');

// const Installment = sequelize.define('Installment', {
//     id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//         allowNull: false,
//     },
//     order_id: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         references: {
//             model: 'Orders',
//             key: 'id',
//         },
//     },
//     due_date: {
//         type: DataTypes.DATEONLY,
//         allowNull: false,
//     },
//     amount: {
//         type: DataTypes.DECIMAL(12, 2),
//         allowNull: false,
//     },
//     status: {
//         type: DataTypes.STRING(50), // e.g., "pending", "paid", "overdue"
//         allowNull: false,
//     },
//     paid_at: {
//         type: DataTypes.DATE,
//         allowNull: true, // null if not yet paid
//     },
// }, {
//     tableName: 'Installments',
//     timestamps: true,
// });

// Installment.associate = (models) => {
//     Installment.belongsTo(models.Order, { foreignKey: 'order_id' });
// };

// module.exports = Installment;
