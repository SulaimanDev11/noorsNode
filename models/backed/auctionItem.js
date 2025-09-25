const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db.js');

const AuctionItem = sequelize.define('AuctionItem', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    auction_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Auctions',
            key: 'id',
        },
    },
    part_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Parts',
            key: 'id',
        },
    },
    start_bid_price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    reserve_price: {
        type: DataTypes.DECIMAL(12, 2),// Seller reserved price
        allowNull: true,
    },
    highest_bid: {
        type: DataTypes.DECIMAL(12, 2), // Highest bid received
        allowNull: true,
    },
    winner_user_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
}, {
    tableName: 'AuctionItems',
    timestamps: true,
});

AuctionItem.associate = (models) => {
    AuctionItem.belongsTo(models.Auction, { foreignKey: 'auction_id' });
    AuctionItem.belongsTo(models.Part, { foreignKey: 'part_id' });
    AuctionItem.belongsTo(models.User, { foreignKey: 'winner_user_id' });
};

module.exports = AuctionItem;
