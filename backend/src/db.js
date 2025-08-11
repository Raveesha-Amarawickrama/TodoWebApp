require('dotenv').config(); // load env variables from .env

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,       // from .env
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,       // optional, if you set in .env
});

module.exports = pool;





