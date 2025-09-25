const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db.js');

const Part = sequelize.define('Part', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    car_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Cars',
            key: 'id',
        },
    },
    part_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    condition: {
        type: DataTypes.STRING(50), // e.g., New, Used, Damaged
        allowNull: false,
    },
    estimated_price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    container_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Containers',
            key: 'id',
        },
    },
    is_auctioned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
}, {
    tableName: 'Parts',
    timestamps: true, // createdAt, updatedAt
});

Part.associate = (models) => {
    Part.belongsTo(models.Car, { foreignKey: 'car_id' });
    Part.belongsTo(models.Container, { foreignKey: 'container_id' });
    Part.hasMany(models.AuctionItem, { foreignKey: 'part_id' });
};

module.exports = Part;
