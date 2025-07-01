const express = require('express');
const router = express.Router();
const {
  createComment,
  getCommentsByPost
} = require('../controllers/commentsController');

// POST /api/comments - Crear un nuevo comentario
router.post('/', createComment);

// GET /api/comments/post/:post_id - Obtener comentarios de un post
router.get('/post/:post_id', getCommentsByPost);

module.exports = router; 