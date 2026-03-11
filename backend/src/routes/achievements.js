const express = require('express');
const router = express.Router();
const achievementsController = require('../controllers/achievementsController');

// GET /api/achievements/:sportspersonId - Get achievements by sportsperson ID
router.get('/:sportspersonId', achievementsController.getAchievementsBySportsperson);

// GET /api/achievements/:sportspersonId/top - Get top achievements
router.get('/:sportspersonId/top', achievementsController.getTopAchievements);

// POST /api/achievements - Create new achievement
router.post('/', achievementsController.createAchievement);

// PUT /api/achievements/:id - Update achievement
router.put('/:id', achievementsController.updateAchievement);

// DELETE /api/achievements/:id - Delete achievement
router.delete('/:id', achievementsController.deleteAchievement);

module.exports = router;
