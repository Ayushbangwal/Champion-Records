const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();

// Import routes
const sportspersonsRouter = require('./routes/sportspersons');
const statisticsRouter = require('./routes/statistics');
const achievementsRouter = require('./routes/achievements');
const recordsRouter = require('./routes/records');
const awardsRouter = require('./routes/awards');
const sportCategoriesRouter = require('./routes/sportCategories');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(compression()); // Compress responses
app.use(morgan('combined')); // HTTP request logger
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Sportsperson Stats API is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/sportspersons', sportspersonsRouter);
app.use('/api/statistics', statisticsRouter);
app.use('/api/achievements', achievementsRouter);
app.use('/api/records', recordsRouter);
app.use('/api/awards', awardsRouter);
app.use('/api/sport-categories', sportCategoriesRouter);

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Sportsperson Stats and Records API',
    version: '1.0.0',
    endpoints: {
      sportspersons: {
        'GET /api/sportspersons': 'Get all sportspersons',
        'GET /api/sportspersons/search?q=query': 'Search sportspersons',
        'GET /api/sportspersons/:id': 'Get sportsperson by ID',
        'GET /api/sportspersons/:id/details': 'Get sportsperson with all details',
        'GET /api/sportspersons/:id/statistics': 'Get sportsperson statistics',
        'GET /api/sportspersons/:id/achievements': 'Get sportsperson achievements',
        'GET /api/sportspersons/:id/records': 'Get sportsperson records',
        'GET /api/sportspersons/:id/awards': 'Get sportsperson awards',
        'POST /api/sportspersons': 'Create new sportsperson',
        'PUT /api/sportspersons/:id': 'Update sportsperson',
        'DELETE /api/sportspersons/:id': 'Delete sportsperson'
      },
      statistics: {
        'GET /api/statistics/:sportspersonId': 'Get statistics by sportsperson ID',
        'GET /api/statistics/:sportspersonId/career': 'Get career statistics',
        'POST /api/statistics': 'Create new statistics',
        'PUT /api/statistics/:id': 'Update statistics',
        'DELETE /api/statistics/:id': 'Delete statistics'
      },
      achievements: {
        'GET /api/achievements/:sportspersonId': 'Get achievements by sportsperson ID',
        'GET /api/achievements/:sportspersonId/top': 'Get top achievements',
        'POST /api/achievements': 'Create new achievement',
        'PUT /api/achievements/:id': 'Update achievement',
        'DELETE /api/achievements/:id': 'Delete achievement'
      },
      records: {
        'GET /api/records/:sportspersonId': 'Get records by sportsperson ID',
        'GET /api/records/:sportspersonId/current': 'Get current records',
        'POST /api/records': 'Create new record',
        'PUT /api/records/:id': 'Update record',
        'DELETE /api/records/:id': 'Delete record'
      },
      awards: {
        'GET /api/awards/:sportspersonId': 'Get awards by sportsperson ID',
        'GET /api/awards/:sportspersonId/recent': 'Get recent awards',
        'POST /api/awards': 'Create new award',
        'PUT /api/awards/:id': 'Update award',
        'DELETE /api/awards/:id': 'Delete award'
      },
      sportCategories: {
        'GET /api/sport-categories': 'Get all sport categories',
        'GET /api/sport-categories/:id': 'Get sport category by ID',
        'POST /api/sport-categories': 'Create new sport category',
        'PUT /api/sport-categories/:id': 'Update sport category',
        'DELETE /api/sport-categories/:id': 'Delete sport category'
      }
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Sportsperson Stats API server running on port ${PORT}`);
  console.log(`📖 API documentation available at http://localhost:${PORT}/api`);
  console.log(`🏥 Health check available at http://localhost:${PORT}/health`);
});

module.exports = app;
