const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rota protegida para listar todos os usuários
router.get('/', authMiddleware, userController.getAllUsers);

module.exports = router;