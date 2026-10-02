const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGO_URI = 'mongodb://abdualsamad956_db_user:rUdYVnGPUsHVejDQ@ac-hbaqybl-shard-00-00.bxxkkdq.mongodb.net:27017,ac-hbaqybl-shard-00-01.bxxkkdq.mongodb.net:27017,ac-hbaqybl-shard-00-02.bxxkkdq.mongodb.net:27017/school_db?ssl=true&replicaSet=atlas-10a3q4-shard-0&authSource=admin';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Database Connected Successfully!'))
  .catch((err) => console.log('Database Connection Error: ', err));

// API Routes
app.use('/api/students', studentRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Professional School ERP Backend is Running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});