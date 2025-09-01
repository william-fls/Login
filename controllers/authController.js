const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { jwtSecret } = require('../config/config');

// Lógica de Registro
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.status(201).json({ message: 'Usuário registrado com sucesso!', user: { id: user.id, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message });
  }
};

// Lógica de Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Gerar o JWT
    const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });

    res.json({ message: 'Login bem-sucedido!', token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
};