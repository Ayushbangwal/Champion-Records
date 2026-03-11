const express = require('express');
const router = express.Router();
const sportCategoriesController = require('../controllers/sportCategoriesController');

// GET /api/sport-categories - Get all sport categories
router.get('/', sportCategoriesController.getAllSportCategories);

// GET /api/sport-categories/:id - Get sport category by ID
router.get('/:id', sportCategoriesController.getSportCategoryById);

// POST /api/sport-categories - Create new sport category
router.post('/', sportCategoriesController.createSportCategory);

// PUT /api/sport-categories/:id - Update sport category
router.put('/:id', sportCategoriesController.updateSportCategory);

// DELETE /api/sport-categories/:id - Delete sport category
router.delete('/:id', sportCategoriesController.deleteSportCategory);

module.exports = router;
