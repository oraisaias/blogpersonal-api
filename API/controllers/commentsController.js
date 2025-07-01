const { query } = require('../config/database');

// Crear un nuevo comentario
async function createComment(req, res) {
  try {
    const { post_id, content, author_name, author_email } = req.body;
    
    // Validaciones básicas
    if (!post_id || !content || !author_name || !author_email) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }
    
    if (content.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'El comentario debe tener al menos 10 caracteres'
      });
    }
    
    // Verificar que el post existe y está publicado
    const postCheck = await query(
      'SELECT id FROM posts WHERE id = $1 AND status = $2',
      [post_id, 'published']
    );
    
    if (postCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado o no publicado'
      });
    }
    
    // Insertar el comentario
    const sql = `
      INSERT INTO comments (post_id, content, author_name, author_email, is_approved)
      VALUES ($1, $2, $3, $4, false)
      RETURNING id, content, author_name, created_at
    `;
    
    const result = await query(sql, [post_id, content.trim(), author_name.trim(), author_email.trim()]);
    
    res.status(201).json({
      success: true,
      message: 'Comentario enviado. Será revisado antes de ser publicado.',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error creando comentario:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}

// Obtener comentarios de un post
async function getCommentsByPost(req, res) {
  try {
    const { post_id } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    // Verificar que el post existe
    const postCheck = await query(
      'SELECT id FROM posts WHERE id = $1 AND status = $2',
      [post_id, 'published']
    );
    
    if (postCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado'
      });
    }
    
    // Obtener comentarios aprobados
    const sql = `
      SELECT id, content, author_name, created_at
      FROM comments
      WHERE post_id = $1 AND is_approved = true
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `;
    
    const result = await query(sql, [post_id, parseInt(limit), offset]);
    
    // Contar total de comentarios aprobados
    const countSql = `
      SELECT COUNT(*) as total
      FROM comments
      WHERE post_id = $1 AND is_approved = true
    `;
    
    const countResult = await query(countSql, [post_id]);
    const total = parseInt(countResult.rows[0].total);
    
    res.json({
      success: true,
      data: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Error obteniendo comentarios:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}

module.exports = {
  createComment,
  getCommentsByPost
}; 