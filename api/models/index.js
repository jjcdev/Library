const { sequelize } = require('../configs/database');
const { DataTypes } = require('sequelize');

const db = {};

// Import des modèles
db.User = require('./Users')(sequelize, DataTypes);
db.Token = require('./Token')(sequelize, DataTypes);
db.Books = require('./Books')(sequelize, DataTypes);

// --- LES RELATIONS ---
// This standard pattern calls the `.associate` method from each model file.

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;

module.exports = db;