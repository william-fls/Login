const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para a página inicial
router.get('/', (req, res) => {
  res.render('index');
});

// Rotas para exibir os formulários
router.get('/login', authController.getLoginPage);
router.get('/register', authController.getRegisterPage);

// Rotas para processar os formulários
router.post('/login', authController.postLogin);
router.post('/register', authController.postRegister);

// Rota de logout
router.get('/logout', authController.logout);

module.exports = router;