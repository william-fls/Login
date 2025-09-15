const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para processar registro
router.post('/register', authController.postRegister);

// Rota para processar login
router.post('/login', authController.postLogin);

module.exports = router;
