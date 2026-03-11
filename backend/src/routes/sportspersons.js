const express = require('express');
const router = express.Router();
const sportspersonController = require('../controllers/sportspersonController');

// GET /api/sportspersons - Get all sportspersons
router.get('/', sportspersonController.getAllSportspersons);

// GET /api/sportspersons/search - Search sportspersons
router.get('/search', sportspersonController.searchSportspersons);

// GET /api/sportspersons/:id - Get sportsperson by ID
router.get('/:id', sportspersonController.getSportspersonById);

// GET /api/sportspersons/:id/details - Get sportsperson with all details
router.get('/:id/details', sportspersonController.getSportspersonDetails);

// GET /api/sportspersons/:id/statistics - Get sportsperson statistics
router.get('/:id/statistics', sportspersonController.getSportspersonStatistics);

// GET /api/sportspersons/:id/achievements - Get sportsperson achievements
router.get('/:id/achievements', sportspersonController.getSportspersonAchievements);

// GET /api/sportspersons/:id/records - Get sportsperson records
router.get('/:id/records', sportspersonController.getSportspersonRecords);

// GET /api/sportspersons/:id/awards - Get sportsperson awards
router.get('/:id/awards', sportspersonController.getSportspersonAwards);

// POST /api/sportspersons - Create new sportsperson
router.post('/', sportspersonController.createSportsperson);

// PUT /api/sportspersons/:id - Update sportsperson
router.put('/:id', sportspersonController.updateSportsperson);

// DELETE /api/sportspersons/:id - Delete sportsperson
router.delete('/:id', sportspersonController.deleteSportsperson);

module.exports = router;
