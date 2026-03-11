const Award = require('../models/Award');

const awardsController = {
  // Get awards by sportsperson ID
  async getAwardsBySportsperson(req, res) {
    try {
      const { sportspersonId } = req.params;
      const awards = await Award.getBySportspersonId(sportspersonId);
      
      res.json({
        success: true,
        data: awards,
        count: awards.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Create new award
  async createAward(req, res) {
    try {
      const awardData = req.body;
      const newAward = await Award.create(awardData);
      
      res.status(201).json({
        success: true,
        data: newAward,
        message: 'Award created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Update award
  async updateAward(req, res) {
    try {
      const { id } = req.params;
      const awardData = req.body;
      
      const updatedAward = await Award.update(id, awardData);
      
      if (!updatedAward) {
        return res.status(404).json({
          success: false,
          message: 'Award not found'
        });
      }
      
      res.json({
        success: true,
        data: updatedAward,
        message: 'Award updated successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Delete award
  async deleteAward(req, res) {
    try {
      const { id } = req.params;
      
      const deleted = await Award.delete(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Award not found'
        });
      }
      
      res.json({
        success: true,
        message: 'Award deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get recent awards
  async getRecentAwards(req, res) {
    try {
      const { sportspersonId } = req.params;
      const { limit = 5 } = req.query;
      
      const awards = await Award.getRecentAwards(sportspersonId, parseInt(limit));
      
      res.json({
        success: true,
        data: awards,
        count: awards.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = awardsController;
