const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');

const dbName = 'library_db';

/**
 * Initialise la base de données MySQL si elle n'existe pas encore.
 */
const setupDatabase = async() => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'mysql-library.alwaysdata.net',
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER || 'library_user',
            password: process.env.DB_PASS
        });
        // On laisse la création de la base de données à l'administrateur de la plateforme d'hébergement (alwaysdata) pour éviter les problèmes de permissions.
        //    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        await connection.end();
    } catch (error) {
        throw error;
    }
};

/**
 * Instance Sequelize configurée pour la connexion à la base de données.
 */
const sequelizeInstance = new Sequelize(
    process.env.DB_NAME || dbName,
    process.env.DB_USER || 'library_user',
    process.env.DB_PASS, {
        host: process.env.DB_HOST || 'mysql-library.alwaysdata.net',
        port: process.env.DB_PORT || 3306,
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