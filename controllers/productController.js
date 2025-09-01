const { Product } = require('../models');

// Criar um novo produto
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = await Product.create({ name, description, price });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar produto.', error: error.message });
  }
};

// Ler todos os produtos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos.', error: error.message });
  }
};

// Ler um produto por ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produto.', error: error.message });
  }
};

// Atualizar um produto
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const [updated] = await Product.update({ name, description, price }, {
      where: { id }
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(id);
      return res.json(updatedProduct);
    }
    throw new Error('Produto não encontrado para atualização.');
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto.', error: error.message });
  }
};

// Deletar um produto
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.destroy({
      where: { id }
    });
    if (deleted) {
      return res.status(204).json({ message: 'Produto deletado com sucesso.' });
    }
    throw new Error('Produto não encontrado para exclusão.');
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar produto.', error: error.message });
  }
};