const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('./middleware/cors');
const { connectDB } = require('./config/database');

// Importar rutas
const postsRoutes = require('./routes/posts');
const categoriesRoutes = require('./routes/categories');
const commentsRoutes = require('./routes/comments');

const app = express();
const port = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middleware de seguridad
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por ventana
  message: {
    success: false,
    message: 'Demasiados requests desde esta IP, intenta de nuevo en 15 minutos'
  }
});
app.use(limiter);

// CORS
app.use(cors);

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 API del Blog Personal funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      posts: '/api/posts',
      categories: '/api/categories',
      comments: '/api/comments'
    }
  });
});

// Rutas de la API
app.use('/api/posts', postsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/comments', commentsRoutes);

// Middleware para manejar rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

// Middleware para manejo de errores
app.use((error, req, res, next) => {
  console.error('Error:', error);
  
  if (error.message === 'No permitido por CORS') {
    return res.status(403).json({
      success: false,
      message: 'Acceso denegado por CORS'
    });
  }
  
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(`📚 API del Blog Personal v1.0.0`);
  console.log(`🔗 Endpoints disponibles:`);
  console.log(`   - GET  /api/posts`);
  console.log(`   - GET  /api/posts/:slug`);
  console.log(`   - GET  /api/posts/search?q=term`);
  console.log(`   - GET  /api/categories`);
  console.log(`   - GET  /api/categories/:slug`);
  console.log(`   - POST /api/comments`);
  console.log(`   - GET  /api/comments/post/:post_id`);
});
