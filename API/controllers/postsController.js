const { query } = require('../config/database');

// Obtener todos los posts publicados
async function getPublishedPosts(req, res) {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const offset = (page - 1) * limit;
    
    let sql = `
      SELECT 
        p.id, p.title, p.slug, p.excerpt, p.featured_image, 
        p.view_count, p.created_at, p.published_at,
        c.name as category_name, c.slug as category_slug, c.color as category_color,
        u.full_name as author_name
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.status = 'published'
    `;
    
    const params = [];
    
    if (category) {
      sql += ` AND c.slug = $${params.length + 1}`;
      params.push(category);
    }
    
    sql += ` ORDER BY p.published_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(parseInt(limit), offset);
    
    const result = await query(sql, params);
    
    // Obtener el total de posts para paginación
    let countSql = `
      SELECT COUNT(*) as total
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.status = 'published'
    `;
    
    if (category) {
      countSql += ` AND c.slug = $1`;
    }
    
    const countResult = await query(countSql, category ? [category] : []);
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
    console.error('Error obteniendo posts:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}

// Obtener un post específico por slug
async function getPostBySlug(req, res) {
  try {
    const { slug } = req.params;
    
    // Incrementar el contador de vistas
    await query(
      'UPDATE posts SET view_count = view_count + 1 WHERE slug = $1',
      [slug]
    );
    
    const sql = `
      SELECT 
        p.id, p.title, p.slug, p.content, p.excerpt, p.featured_image,
        p.view_count, p.created_at, p.published_at,
        c.name as category_name, c.slug as category_slug, c.color as category_color,
        u.full_name as author_name, u.bio as author_bio
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.slug = $1 AND p.status = 'published'
    `;
    
    const result = await query(sql, [slug]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado'
      });
    }
    
    // Obtener comentarios aprobados
    const commentsSql = `
      SELECT id, content, author_name, created_at
      FROM comments
      WHERE post_id = $1 AND is_approved = true
      ORDER BY created_at DESC
    `;
    
    const commentsResult = await query(commentsSql, [result.rows[0].id]);
    
    const post = result.rows[0];
    post.comments = commentsResult.rows;
    
    res.json({
      success: true,
      data: post
    });
    
  } catch (error) {
    console.error('Error obteniendo post:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}

// Obtener posts relacionados (misma categoría)
async function getRelatedPosts(req, res) {
  try {
    const { slug } = req.params;
    const { limit = 3 } = req.query;
    
    const sql = `
      SELECT 
        p.id, p.title, p.slug, p.excerpt, p.created_at,
        c.name as category_name, c.slug as category_slug
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.status = 'published' 
        AND p.slug != $1
        AND p.category_id = (
          SELECT category_id 
          FROM posts 
          WHERE slug = $1
        )
      ORDER BY p.published_at DESC
      LIMIT $2
    `;
    
    const result = await query(sql, [slug, parseInt(limit)]);
    
    res.json({
      success: true,
      data: result.rows
    });
    
  } catch (error) {
    console.error('Error obteniendo posts relacionados:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}

// Buscar posts
async function searchPosts(req, res) {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'El término de búsqueda debe tener al menos 2 caracteres'
      });
    }
    
    const searchTerm = `%${q.trim()}%`;
    
    const sql = `
      SELECT 
        p.id, p.title, p.slug, p.excerpt, p.created_at,
        c.name as category_name, c.slug as category_slug
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.status = 'published'
        AND (p.title ILIKE $1 OR p.content ILIKE $1 OR p.excerpt ILIKE $1)
      ORDER BY p.published_at DESC
      LIMIT $2 OFFSET $3
    `;
    
    const result = await query(sql, [searchTerm, parseInt(limit), offset]);
    
    // Contar resultados totales
    const countSql = `
      SELECT COUNT(*) as total
      FROM posts p
      WHERE p.status = 'published'
        AND (p.title ILIKE $1 OR p.content ILIKE $1 OR p.excerpt ILIKE $1)
    `;
    
    const countResult = await query(countSql, [searchTerm]);
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
    console.error('Error buscando posts:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}

module.exports = {
  getPublishedPosts,
  getPostBySlug,
  getRelatedPosts,
  searchPosts
}; 