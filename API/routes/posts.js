const express = require('express');
const router = express.Router();
const {
  getPublishedPosts,
  getPostBySlug,
  getRelatedPosts,
  searchPosts
} = require('../controllers/postsController');

// GET /api/posts - Obtener todos los posts publicados
router.get('/', getPublishedPosts);

// GET /api/posts/search - Buscar posts
router.get('/search', searchPosts);

// GET /api/posts/:slug - Obtener un post específico
router.get('/:slug', getPostBySlug);

// GET /api/posts/:slug/related - Obtener posts relacionados
router.get('/:slug/related', getRelatedPosts);

module.exports = router; 