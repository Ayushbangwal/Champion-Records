const SportCategory = require('../models/SportCategory');

const sportCategoriesController = {
  // Get all sport categories
  async getAllSportCategories(req, res) {
    try {
      const categories = await SportCategory.getAll();
      
      res.json({
        success: true,
        data: categories,
        count: categories.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get sport category by ID
  async getSportCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await SportCategory.getById(id);
      
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Sport category not found'
        });
      }
      
      res.json({
        success: true,
        data: category
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Create new sport category
  async createSportCategory(req, res) {
    try {
      const categoryData = req.body;
      const newCategory = await SportCategory.create(categoryData);
      
      res.status(201).json({
        success: true,
        data: newCategory,
        message: 'Sport category created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Update sport category
  async updateSportCategory(req, res) {
    try {
      const { id } = req.params;
      const categoryData = req.body;
      
      const updatedCategory = await SportCategory.update(id, categoryData);
      
      if (!updatedCategory) {
        return res.status(404).json({
          success: false,
          message: 'Sport category not found'
        });
      }
      
      res.json({
        success: true,
        data: updatedCategory,
        message: 'Sport category updated successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Delete sport category
  async deleteSportCategory(req, res) {
    try {
      const { id } = req.params;
      
      const deleted = await SportCategory.delete(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Sport category not found'
        });
      }
      
      res.json({
        success: true,
        message: 'Sport category deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = sportCategoriesController;
