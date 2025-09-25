const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const { sequelize } = require('../config/db');
const db = {};

fs.readdirSync(__dirname)
    .filter(file => file !== basename && file.endsWith('.js'))
    .forEach(file => {
        const model = require(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
module.exports = db;
