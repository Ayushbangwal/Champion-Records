const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');

// GET /api/statistics/:sportspersonId - Get statistics by sportsperson ID
router.get('/:sportspersonId', statisticsController.getStatisticsBySportsperson);

// GET /api/statistics/:sportspersonId/career - Get career statistics
router.get('/:sportspersonId/career', statisticsController.getCareerStatistics);

// POST /api/statistics - Create new statistics
router.post('/', statisticsController.createStatistics);

// PUT /api/statistics/:id - Update statistics
router.put('/:id', statisticsController.updateStatistics);

// DELETE /api/statistics/:id - Delete statistics
router.delete('/:id', statisticsController.deleteStatistics);

module.exports = router;
