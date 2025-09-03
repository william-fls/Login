const mysql = require('mysql2/promise');
require('dotenv').config();

// Carrega as variáveis de ambiente do seu arquivo .env
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const initializeDatabase = async () => {
  // Garante que todas as variáveis necessárias foram carregadas
  if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
    console.error('Erro: Por favor, defina DB_HOST, DB_USER, DB_PASSWORD, e DB_NAME no seu arquivo .env');
    process.exit(1);
  }

  try {
    // 1. Conecta ao servidor MySQL (sem especificar um banco de dados)
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    // 2. Executa o comando SQL para criar o banco de dados SE ELE NÃO EXISTIR
    // O uso de ` ` (backticks) ao redor do nome do banco de dados é uma boa prática para evitar erros com nomes que possam ser palavras-chave do SQL.
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    
    console.log(`[SETUP] Banco de dados '${DB_NAME}' verificado/criado com sucesso.`);

    // 3. Fecha a conexão
    await connection.end();
  } catch (error) {
    // Trata erros comuns como acesso negado
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error(`[ERRO] Acesso negado para o usuário '${DB_USER}'. Verifique as credenciais no arquivo .env.`);
    } else {
      console.error('[ERRO] Não foi possível inicializar o banco de dados:', error);
    }
    process.exit(1); // Encerra o processo com um código de erro
  }
};

// Executa a função
initializeDatabase();