const { Product } = require('../models');

exports.createProduct = async (productData) => {
  return Product.create(productData);
};

exports.getAllProducts = async () => {
  return Product.findAll();
};

exports.getProductById = async (id) => {
  return Product.findByPk(id);
};

exports.updateProduct = async (id, productData) => {
  const [updated] = await Product.update(productData, { where: { id } });
  if (updated) {
    return Product.findByPk(id);
  }
  return null; // Retorna nulo se o produto não for encontrado
};

exports.deleteProduct = async (id) => {
  return Product.destroy({ where: { id } });
};