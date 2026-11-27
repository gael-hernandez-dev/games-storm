const { createPool } = require('mysql2');
import 'dotenv/config';

const db = createPool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWWORD,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = db;