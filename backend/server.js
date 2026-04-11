const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Make the uploads folder publicly accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err.stack);
  res.status(500).json({
    message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
  });
});

// 404 Route Catcher
app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Database connection
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });
