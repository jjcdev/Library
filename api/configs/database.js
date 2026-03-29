const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');

const dbName = 'Library';

/**
 * Initialise la base de données MySQL si elle n'existe pas encore.
 */
const setupDatabase = async() => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || ''
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        await connection.end();
    } catch (error) {
        throw error;
    }
};

/**
 * Instance Sequelize configurée pour la connexion à la base de données.
 */
const sequelizeInstance = new Sequelize(dbName, 'root', '', {
    host: process.env.DB_HOST || 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false,
    define: {
        timestamps: true
    }
});

module.exports = {
    sequelize: sequelizeInstance,
    initialize: setupDatabase
};