const { body, param, query, validationResult } = require('express-validator');

// Middleware para validar resultados
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Datos de entrada inválidos',
      errors: errors.array()
    });
  }
  next();
};

// Validaciones para comentarios
const validateComment = [
  body('post_id').isInt({ min: 1 }).withMessage('ID de post inválido'),
  body('content')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('El comentario debe tener entre 10 y 1000 caracteres')
    .escape(),
  body('author_name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres')
    .escape(),
  body('author_email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email inválido'),
  validate
];

// Validaciones para búsqueda
const validateSearch = [
  query('q')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El término de búsqueda debe tener entre 2 y 100 caracteres')
    .escape(),
  query('page').optional().isInt({ min: 1 }).withMessage('Página inválida'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Límite inválido'),
  validate
];

// Validaciones para paginación
const validatePagination = [
  query('page').optional().isInt({ min: 1 }).withMessage('Página inválida'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Límite inválido'),
  validate
];

// Validaciones para parámetros de URL
const validateSlug = [
  param('slug')
    .trim()
    .isLength({ min: 1, max: 200 })
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug inválido (solo letras minúsculas, números y guiones)'),
  validate
];

const validatePostId = [
  param('post_id').isInt({ min: 1 }).withMessage('ID de post inválido'),
  validate
];

module.exports = {
  validateComment,
  validateSearch,
  validatePagination,
  validateSlug,
  validatePostId
}; 