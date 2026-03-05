const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');

const dbName = 'Library';

// 1. Fonction pour créer la BDD si elle n'existe pas
const setupDatabase = async() => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '' // Vide pour Laragon
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        console.log(`✅ Base de données "${dbName}" prête.`);
        await connection.end();
    } catch (error) {
        console.error('❌ Erreur lors de la création de la base :', error.message);
        throw error;
    }
};

// 2. Instance Sequelize (Une seule déclaration propre)
const sequelizeInstance = new Sequelize(dbName, 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false,
    define: {
        timestamps: true
    }
});

// 3. Exportation correcte
module.exports = {
    sequelize: sequelizeInstance,
    initialize: setupDatabase
};