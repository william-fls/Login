const jwt = require('jsonwebtoken'); // Ainda podemos usar JWT se quisermos uma API híbrida
const userService = require('../services/userService');
const User = require('../models/user'); // Precisamos do modelo para o método checkPassword

// Exibir a página de login
exports.getLoginPage = (req, res) => {
  res.render('login');
};

// Exibir a página de registro
exports.getRegisterPage = (req, res) => {
  res.render('register');
};

// Processar o registro do formulário
exports.postRegister = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await userService.findUserByUsername(username);

    if (existingUser) {
      req.flash('error_msg', 'Este nome de usuário já está em uso.');
      return res.redirect('/register');
    }

    await userService.registerUser(username, password);
    req.flash('success_msg', 'Você foi registrado e já pode fazer login!');
    res.redirect('/login');
  } catch (error) {
    req.flash('error_msg', 'Algo deu errado. Tente novamente.');
    res.redirect('/register');
  }
};

// Processar o login do formulário
exports.postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userService.findUserByUsername(username);

    if (!user) {
      req.flash('error_msg', 'Usuário ou senha inválidos.');
      return res.redirect('/login');
    }

    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      req.flash('error_msg', 'Usuário ou senha inválidos.');
      return res.redirect('/login');
    }

    // Armazena o usuário na sessão
    req.session.user = {
      id: user.id,
      username: user.username
    };

    res.redirect('/'); // Redireciona para a página inicial após o login

  } catch (error) {
    req.flash('error_msg', 'Erro ao fazer login.');
    res.redirect('/login');
  }
};

// Fazer logout
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
};