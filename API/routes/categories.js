const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryBySlug
} = require('../controllers/categoriesController');

// GET /api/categories - Obtener todas las categorías
router.get('/', getAllCategories);

// GET /api/categories/:slug - Obtener una categoría específica con sus posts
router.get('/:slug', getCategoryBySlug);

module.exports = router; 