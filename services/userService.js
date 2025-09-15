const { User } = require('../models');

exports.registerUser = async (username, password) => {
  try {
    const user = await User.create({ username, password });
    // Retornamos apenas os dados seguros do usuário
    return { id: user.id, username: user.username };
  } catch (error) {
    // Lançamos o erro para ser tratado no controller
    throw new Error('Erro ao registrar usuário: ' + error.message);
  }
};

exports.findUserByUsername = async (username) => {
  return User.findOne({ where: { username } });
};

exports.getAllUsers = async () => {
    // Excluímos o campo 'password' da consulta por segurança
    return User.findAll({ attributes: { exclude: ['password'] } });
};