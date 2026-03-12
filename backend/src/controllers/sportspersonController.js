const Sportsperson = require('../models/Sportsperson');
const Statistics = require('../models/Statistics');
const Achievement = require('../models/Achievement');
const Record = require('../models/Record');
const Award = require('../models/Award');
   async function getPlayerImage(playerName) {
  // Wikipedia
  try {
    const wikiRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(playerName)}`
    );
    const wikiData = await wikiRes.json();

    if (wikiData.thumbnail && wikiData.thumbnail.source) {
      return wikiData.thumbnail.source;
    }
  } catch (e) {}

  // TheSportsDB
  try {
    const sportsRes = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodedURIComponent(playerName)}`
    );
    const sportsData = await sportsRes.json();

    if (sportsData.player && sportsData.player[0].strThumb) {
      return sportsData.player[0].strThumb;
    }
  } catch (e) {}

  // Unsplash fallback
  return `https://ui-avatars.com/api/?name=${playerName}&background=random&size=400`;
}

const sportspersonController = {
  // Get all sportspersons
  async getAllSportspersons(req, res) {
    try {
      const sportspersons = await Sportsperson.getAll();
      const sportspersonsWithImages = await Promise.all(
  sportspersons.map(async (player) => {
    const fullName = `${player.first_name} ${player.last_name}`;
    const image = await getPlayerImage(fullName);
    return { ...player, image };
  })
);
      res.json({
        success: true,
        data: sportspersonsWithImages,
        count: sportspersonsWithImages.length
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
      const image = await getPlayerImage(
        `${sportsperson.first_name} ${sportsperson.last_name}`
      );
      
      if (!sportsperson) {
        return res.status(404).json({
          success: false,
          message: 'Sportsperson not found'
        });
      }
      
      res.json({
        success: true,
        data: {
          ...sportsperson,
          image
        }
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
      const fullName = `${sportsperson.first_name} ${sportsperson.last_name}`;
      const image = await getPlayerImage(fullName);
      
      
      if (!sportsperson) {
        return res.status(404).json({
          success: false,
          message: 'Sportsperson not found'
        });
      }
      
      
      res.json({
        success: true,
        data: {
        ...sportsperson,
        image
        }
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

const sportspersonsWithImages = await Promise.all(
  sportspersons.map(async (player) => {
    const fullName = `${player.first_name} ${player.last_name}`;
    const image = await getPlayerImage(fullName);

    return { ...player, image };
  })
);

res.json({
  success: true,
  data: sportspersonsWithImages,
  count: sportspersonsWithImages.length
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
