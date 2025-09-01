require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'chave-secreta-padrao',
  database: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
};