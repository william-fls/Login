const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

const authMiddleware = (req, res, next) => {
  // Pega o token do header de autorização
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
  }

  const token = authHeader.split(' ')[1]; // Espera o formato "Bearer <token>"

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Adiciona a carga do token ao objeto da requisição
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token de autenticação inválido.' });
  }
};

module.exports = authMiddleware;