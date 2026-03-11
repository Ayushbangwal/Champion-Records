const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/recordsController');

// GET /api/records/:sportspersonId - Get records by sportsperson ID
router.get('/:sportspersonId', recordsController.getRecordsBySportsperson);

// GET /api/records/:sportspersonId/current - Get current records
router.get('/:sportspersonId/current', recordsController.getCurrentRecords);

// POST /api/records - Create new record
router.post('/', recordsController.createRecord);

// PUT /api/records/:id - Update record
router.put('/:id', recordsController.updateRecord);

// DELETE /api/records/:id - Delete record
router.delete('/:id', recordsController.deleteRecord);

module.exports = router;
