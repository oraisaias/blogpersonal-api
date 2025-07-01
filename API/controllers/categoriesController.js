const { query } = require('../config/database');

// Obtener todas las categorías
async function getAllCategories(req, res) {
  try {
    const sql = `
      SELECT 
        c.id, c.name, c.slug, c.description, c.color, c.created_at,
        COUNT(p.id) as post_count
      FROM categories c
      LEFT JOIN posts p ON c.id = p.category_id AND p.status = 'published'
      GROUP BY c.id, c.name, c.slug, c.description, c.color, c.created_at
      ORDER BY c.name ASC
    `;
    
    const result = await query(sql);
    
    res.json({
      success: true,
      data: result.rows
    });
    
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}

// Obtener una categoría específica por slug
async function getCategoryBySlug(req, res) {
  try {
    const { slug } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    // Obtener información de la categoría
    const categorySql = `
      SELECT id, name, slug, description, color, created_at
      FROM categories
      WHERE slug = $1
    `;
    
    const categoryResult = await query(categorySql, [slug]);
    
    if (categoryResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }
    
    const category = categoryResult.rows[0];
    
    // Obtener posts de esta categoría
    const postsSql = `
      SELECT 
        p.id, p.title, p.slug, p.excerpt, p.featured_image,
        p.view_count, p.created_at, p.published_at,
        u.full_name as author_name
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.category_id = $1 AND p.status = 'published'
      ORDER BY p.published_at DESC
      LIMIT $2 OFFSET $3
    `;
    
    const postsResult = await query(postsSql, [category.id, parseInt(limit), offset]);
    
    // Contar total de posts en esta categoría
    const countSql = `
      SELECT COUNT(*) as total
      FROM posts
      WHERE category_id = $1 AND status = 'published'
    `;
    
    const countResult = await query(countSql, [category.id]);
    const total = parseInt(countResult.rows[0].total);
    
    category.posts = postsResult.rows;
    category.pagination = {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    };
    
    res.json({
      success: true,
      data: category
    });
    
  } catch (error) {
    console.error('Error obteniendo categoría:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}

module.exports = {
  getAllCategories,
  getCategoryBySlug
}; 