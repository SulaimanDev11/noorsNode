
const { Sequelize, DataTypes, Op } = require('sequelize');



const sequelize = new Sequelize(
    "noors",
    "root",
    "",
    {
        host: 'localhost',
        dialect: "mysql"
    });

sequelize
    .authenticate()
    .then(() => {
        console.log('connected');
    })
    .catch((e) => {
        console.log('error', e);
    });

// sequelize.sync({ alter: true, force: false }).then(() => {
//     console.log('Tables synced successfully');
// }).catch(err => {
//     console.error('Error syncing tables:', err);
// });

module.exports = { sequelize, Sequelize, DataTypes, Op };


