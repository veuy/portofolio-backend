require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const createError = require('http-errors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const serviceRoutes = require('./routes/services.routes');
const projectRoutes = require('./routes/projects.routes');
const referenceRoutes = require('./routes/references.routes');
const userRoutes = require('./routes/users.routes');

// Use routes
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/references', referenceRoutes);
app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res, next) => {
  next(createError(404, 'Route not found'));
});

// Global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({
    success: false,
    message: message
  });
});

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
});
