const Sportsperson = require('../models/Sportsperson');
const Statistics = require('../models/Statistics');
const Achievement = require('../models/Achievement');
const Record = require('../models/Record');
const Award = require('../models/Award');

const sportspersonController = {
  // Get all sportspersons
  async getAllSportspersons(req, res) {
    try {
      const sportspersons = await Sportsperson.getAll();
      res.json({
        success: true,
        data: sportspersons,
        count: sportspersons.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get sportsperson by ID
  async getSportspersonById(req, res) {
    try {
      const { id } = req.params;
      const sportsperson = await Sportsperson.getById(id);
      
      if (!sportsperson) {
        return res.status(404).json({
          success: false,
          message: 'Sportsperson not found'
        });
      }
      
      res.json({
        success: true,
        data: sportsperson
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get sportsperson with all details
  async getSportspersonDetails(req, res) {
    try {
      const { id } = req.params;
      const sportsperson = await Sportsperson.getWithDetails(id);
      
      if (!sportsperson) {
        return res.status(404).json({
          success: false,
          message: 'Sportsperson not found'
        });
      }
      
      res.json({
        success: true,
        data: sportsperson
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Create new sportsperson
  async createSportsperson(req, res) {
    try {
      const sportspersonData = req.body;
      const newSportsperson = await Sportsperson.create(sportspersonData);
      
      res.status(201).json({
        success: true,
        data: newSportsperson,
        message: 'Sportsperson created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Update sportsperson
  async updateSportsperson(req, res) {
    try {
      const { id } = req.params;
      const sportspersonData = req.body;
      
      const updatedSportsperson = await Sportsperson.update(id, sportspersonData);
      
      if (!updatedSportsperson) {
        return res.status(404).json({
          success: false,
          message: 'Sportsperson not found'
        });
      }
      
      res.json({
        success: true,
        data: updatedSportsperson,
        message: 'Sportsperson updated successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Delete sportsperson
  async deleteSportsperson(req, res) {
    try {
      const { id } = req.params;
      
      const deleted = await Sportsperson.delete(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Sportsperson not found'
        });
      }
      
      res.json({
        success: true,
        message: 'Sportsperson deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Search sportspersons
  async searchSportspersons(req, res) {
    try {
      const { q } = req.query;
      
      if (!q) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }
      
      const sportspersons = await Sportsperson.search(q);
      
      res.json({
        success: true,
        data: sportspersons,
        count: sportspersons.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get sportsperson statistics
  async getSportspersonStatistics(req, res) {
    try {
      const { id } = req.params;
      const statistics = await Statistics.getBySportspersonId(id);
      const careerStats = await Statistics.getCareerStats(id);
      
      res.json({
        success: true,
        data: {
          seasonStats: statistics,
          careerStats
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get sportsperson achievements
  async getSportspersonAchievements(req, res) {
    try {
      const { id } = req.params;
      const achievements = await Achievement.getBySportspersonId(id);
      
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

  // Get sportsperson records
  async getSportspersonRecords(req, res) {
    try {
      const { id } = req.params;
      const records = await Record.getBySportspersonId(id);
      
      res.json({
        success: true,
        data: records,
        count: records.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get sportsperson awards
  async getSportspersonAwards(req, res) {
    try {
      const { id } = req.params;
      const awards = await Award.getBySportspersonId(id);
      
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

module.exports = sportspersonController;
