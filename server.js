require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Middleware
// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:5173',
    'https://asprisha.com',
    'https://www.asprisha.com',
    'https://admin.asprisha.com',
    'https://asprisha-frontend.onrender.com'
  ],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));

// ✅ ADD THIS HEALTH ROUTE (FIX)
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    status: 'OK', 
    message: 'Backend is running',
    timestamp: new Date().toISOString() 
  });
});

// Home route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 AISPL Backend API is running',
    endpoints: {
      auth: '/api/auth',
      projects: '/api/projects',
      contact: '/api/contact',
      health: '/api/health'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📡 http://localhost:${PORT}\n`);
});