const Record = require('../models/Record');

const recordsController = {
  // Get records by sportsperson ID
  async getRecordsBySportsperson(req, res) {
    try {
      const { sportspersonId } = req.params;
      const records = await Record.getBySportspersonId(sportspersonId);
      
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

  // Create new record
  async createRecord(req, res) {
    try {
      const recordData = req.body;
      const newRecord = await Record.create(recordData);
      
      res.status(201).json({
        success: true,
        data: newRecord,
        message: 'Record created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Update record
  async updateRecord(req, res) {
    try {
      const { id } = req.params;
      const recordData = req.body;
      
      const updatedRecord = await Record.update(id, recordData);
      
      if (!updatedRecord) {
        return res.status(404).json({
          success: false,
          message: 'Record not found'
        });
      }
      
      res.json({
        success: true,
        data: updatedRecord,
        message: 'Record updated successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Delete record
  async deleteRecord(req, res) {
    try {
      const { id } = req.params;
      
      const deleted = await Record.delete(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Record not found'
        });
      }
      
      res.json({
        success: true,
        message: 'Record deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get current records
  async getCurrentRecords(req, res) {
    try {
      const { sportspersonId } = req.params;
      const records = await Record.getCurrentRecords(sportspersonId);
      
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
  }
};

module.exports = recordsController;
