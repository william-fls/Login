const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas protegidas (precisam de um token JWT válido)
router.post('/', authMiddleware, productController.createProduct);
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

// Rotas públicas (não precisam de token para acesso)
// ou você pode adicionar authMiddleware se preferir
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

module.exports = router;