const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Exit process on DB failure
  });

// Import Routes
const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes); // Auth routes

// Sample Route
app.get('/', (req, res) => {
  res.send('Hello from the SecureConnect Backend!');
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
