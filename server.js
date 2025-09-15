const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const sequelize = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do View Engine (Pug)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares
app.use(express.json()); // Para processar JSON
app.use(express.urlencoded({ extended: false })); // Para processar formulários HTML
app.use(express.static(path.join(__dirname, 'public'))); // Servir arquivos estáticos (CSS, JS, etc.)

// Configuração da Sessão
app.use(session({
  secret: process.env.JWT_SECRET, // Reutilizando o segredo
  resave: false,
  saveUninitialized: false,
}));

// Middleware do Connect-Flash
app.use(flash());

// Middleware para passar variáveis globais para as views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.user = req.session.user || null; // Passa o usuário da sessão para as views
  next();
});

require('./models');

// Rotas
app.use('/api/auth', authRoutes); // Mantemos as rotas da API se precisar
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Novas rotas para as views
const mainRoutes = require('./routes/mainRoutes'); // Criaremos este arquivo
app.use('/', mainRoutes);


// Inicia o servidor
sequelize.sync({ alter: true }) // Usando sync com alter para desenvolvimento
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });