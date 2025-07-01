const { Client } = require('pg');

// Configuración de la base de datos
const dbConfig = {
  user: process.env.PGUSER || 'admin',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'mydb',
  password: process.env.PGPASSWORD || 'secret',
  port: process.env.PGPORT || 5432,
};

// Cliente de base de datos
const client = new Client(dbConfig);

// Conectar a la base de datos
async function connectDB() {
  try {
    await client.connect();
    console.log('🟢 Conectado a PostgreSQL');
  } catch (error) {
    console.error('🔴 Error conectando a PostgreSQL:', error);
    process.exit(1);
  }
}

// Función para ejecutar consultas
async function query(text, params) {
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error('🔴 Error en consulta:', error);
    throw error;
  }
}

// Función para cerrar la conexión
async function closeDB() {
  try {
    await client.end();
    console.log('🔌 Conexión a PostgreSQL cerrada');
  } catch (error) {
    console.error('🔴 Error cerrando conexión:', error);
  }
}

module.exports = {
  client,
  connectDB,
  query,
  closeDB
}; 