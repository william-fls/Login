const sequelize = require('../config/database');
const User = require('./user');
const Product = require('./product');

const models = {
  User,
  Product,
};

Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

// Sincroniza os modelos com o banco de dados
// { force: true } irá recriar as tabelas (use com cautela em produção)
sequelize.sync()
  .then(() => console.log('Tabelas sincronizadas!'))
  .catch(err => console.error('Erro ao sincronizar tabelas:', err));

module.exports = models;