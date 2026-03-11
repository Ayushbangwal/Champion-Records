const express = require('express');
const router = express.Router();
const awardsController = require('../controllers/awardsController');

// GET /api/awards/:sportspersonId - Get awards by sportsperson ID
router.get('/:sportspersonId', awardsController.getAwardsBySportsperson);

// GET /api/awards/:sportspersonId/recent - Get recent awards
router.get('/:sportspersonId/recent', awardsController.getRecentAwards);

// POST /api/awards - Create new award
router.post('/', awardsController.createAward);

// PUT /api/awards/:id - Update award
router.put('/:id', awardsController.updateAward);

// DELETE /api/awards/:id - Delete award
router.delete('/:id', awardsController.deleteAward);

module.exports = router;
