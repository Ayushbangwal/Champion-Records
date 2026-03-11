const Achievement = require('../models/Achievement');

const achievementsController = {
  // Get achievements by sportsperson ID
  async getAchievementsBySportsperson(req, res) {
    try {
      const { sportspersonId } = req.params;
      const achievements = await Achievement.getBySportspersonId(sportspersonId);
      
      res.json({
        success: true,
        data: achievements,
        count: achievements.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Create new achievement
  async createAchievement(req, res) {
    try {
      const achievementData = req.body;
      const newAchievement = await Achievement.create(achievementData);
      
      res.status(201).json({
        success: true,
        data: newAchievement,
        message: 'Achievement created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Update achievement
  async updateAchievement(req, res) {
    try {
      const { id } = req.params;
      const achievementData = req.body;
      
      const updatedAchievement = await Achievement.update(id, achievementData);
      
      if (!updatedAchievement) {
        return res.status(404).json({
          success: false,
          message: 'Achievement not found'
        });
      }
      
      res.json({
        success: true,
        data: updatedAchievement,
        message: 'Achievement updated successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Delete achievement
  async deleteAchievement(req, res) {
    try {
      const { id } = req.params;
      
      const deleted = await Achievement.delete(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Achievement not found'
        });
      }
      
      res.json({
        success: true,
        message: 'Achievement deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get top achievements
  async getTopAchievements(req, res) {
    try {
      const { sportspersonId } = req.params;
      const { limit = 5 } = req.query;
      
      const achievements = await Achievement.getTopAchievements(sportspersonId, parseInt(limit));
      
      res.json({
        success: true,
        data: achievements,
        count: achievements.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = achievementsController;
