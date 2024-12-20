require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/payments', paymentRoutes);

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Database connection error:', err));

// Start server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
