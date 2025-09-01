const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar JSON
app.use(bodyParser.json());

// Sincroniza os modelos com o banco de dados
require('./models');

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Teste de rota
app.get('/', (req, res) => {
  res.send('API Node.js com JWT e Sequelize funcionando!');
});

// Inicia o servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });