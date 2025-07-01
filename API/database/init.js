const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// Configuración de la base de datos
const dbConfig = {
  user: 'admin',
  host: 'localhost',
  database: 'mydb',
  password: 'secret',
  port: 5432,
};

// Función para conectar a la base de datos
async function connectToDatabase() {
  const client = new Client(dbConfig);
  await client.connect();
  console.log('🟢 Conectado a PostgreSQL');
  return client;
}

// Función para crear las tablas (esquema)
async function createTables() {
  const client = await connectToDatabase();
  
  try {
    console.log('📋 Creando esquema de base de datos...');
    
    // Leer el esquema SQL
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Ejecutar el esquema
    await client.query(schema);
    
    console.log('✅ Esquema de base de datos creado');
    console.log('✅ Tablas creadas: users, categories, posts, comments');
    console.log('✅ Índices creados para optimizar consultas');
    
  } catch (error) {
    console.error('🔴 Error creando las tablas:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Función para poblar las tablas con datos de ejemplo
async function seedDatabase() {
  const client = await connectToDatabase();
  
  try {
    console.log('🌱 Poblando base de datos con datos de ejemplo...');
    
    // Leer el archivo de datos
    const seedPath = path.join(__dirname, 'seed.sql');
    const seedData = fs.readFileSync(seedPath, 'utf8');

    // Ejecutar los datos de ejemplo
    await client.query(seedData);
    
    // Actualizar contraseñas con hash real
    console.log('🔐 Configurando contraseñas de usuarios...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    const editorPassword = await bcrypt.hash('editor123', 10);
    
    await client.query(`
      UPDATE users 
      SET password_hash = $1 
      WHERE username = 'admin'
    `, [adminPassword]);
    
    await client.query(`
      UPDATE users 
      SET password_hash = $1 
      WHERE username = 'editor'
    `, [editorPassword]);
    
    console.log('✅ Datos de ejemplo insertados');
    console.log('✅ Usuarios configurados:');
    console.log('   - admin (password: admin123)');
    console.log('   - editor (password: editor123)');
    console.log('✅ Categorías creadas: Tecnología, Personal, Tutoriales, etc.');
    console.log('✅ Posts de ejemplo creados');
    console.log('✅ Comentarios de ejemplo creados');
    
  } catch (error) {
    console.error('🔴 Error poblando la base de datos:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Función principal que ejecuta todo
async function initDatabase() {
  try {
    await createTables();
    await seedDatabase();
    console.log('🎉 Base de datos inicializada completamente');
  } catch (error) {
    console.error('🔴 Error en la inicialización:', error);
    process.exit(1);
  }
}

// Función para solo crear tablas
async function initTablesOnly() {
  try {
    await createTables();
    console.log('🎉 Tablas creadas correctamente');
  } catch (error) {
    console.error('🔴 Error creando tablas:', error);
    process.exit(1);
  }
}

// Función para solo poblar datos
async function seedDataOnly() {
  try {
    await seedDatabase();
    console.log('🎉 Datos poblados correctamente');
  } catch (error) {
    console.error('🔴 Error poblando datos:', error);
    process.exit(1);
  }
}

// Manejo de argumentos de línea de comandos
const args = process.argv.slice(2);
const command = args[0];

// Ejecutar según el comando
if (require.main === module) {
  switch (command) {
    case 'tables':
      console.log('🔧 Creando solo las tablas...');
      initTablesOnly();
      break;
    case 'seed':
      console.log('🌱 Poblando solo los datos...');
      seedDataOnly();
      break;
    case 'full':
    default:
      console.log('🚀 Inicialización completa de la base de datos...');
      initDatabase();
      break;
  }
}

// Exportar funciones para uso en otros módulos
module.exports = { 
  createTables, 
  seedDatabase, 
  initDatabase,
  initTablesOnly,
  seedDataOnly 
}; 