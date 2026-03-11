const Statistics = require('../models/Statistics');

const statisticsController = {
  // Get statistics by sportsperson ID
  async getStatisticsBySportsperson(req, res) {
    try {
      const { sportspersonId } = req.params;
      const statistics = await Statistics.getBySportspersonId(sportspersonId);
      
      res.json({
        success: true,
        data: statistics,
        count: statistics.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Create new statistics
  async createStatistics(req, res) {
    try {
      const statisticsData = req.body;
      const newStatistics = await Statistics.create(statisticsData);
      
      res.status(201).json({
        success: true,
        data: newStatistics,
        message: 'Statistics created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Update statistics
  async updateStatistics(req, res) {
    try {
      const { id } = req.params;
      const statisticsData = req.body;
      
      const updatedStatistics = await Statistics.update(id, statisticsData);
      
      if (!updatedStatistics) {
        return res.status(404).json({
          success: false,
          message: 'Statistics not found'
        });
      }
      
      res.json({
        success: true,
        data: updatedStatistics,
        message: 'Statistics updated successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Delete statistics
  async deleteStatistics(req, res) {
    try {
      const { id } = req.params;
      
      const deleted = await Statistics.delete(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Statistics not found'
        });
      }
      
      res.json({
        success: true,
        message: 'Statistics deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get career statistics
  async getCareerStatistics(req, res) {
    try {
      const { sportspersonId } = req.params;
      const careerStats = await Statistics.getCareerStats(sportspersonId);
      
      res.json({
        success: true,
        data: careerStats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = statisticsController;
