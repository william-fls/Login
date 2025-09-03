const { Sequelize } = require('sequelize');
const { database } = require('./config');

const sequelize = new Sequelize(
  database.name,
  database.user,
  database.password,
  {
    host: database.host,
    dialect: database.dialect,
    logging: false, // Descomente para ver os logs do SQL
  }
);

module.exports = sequelize;