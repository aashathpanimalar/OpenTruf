//index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models'); // Import the models
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

// Use body-parser to parse JSON bodies
app.use(bodyParser.json());

// Sync database models
const syncDatabase = async () => {
  try {
    await db.sequelize.sync({ alter: true }); // or { force: true } to drop and recreate the table
    console.log('Database synchronized');
  } catch (error) {
    console.error('Failed to synchronize database:', error);
  }
};

// Call syncDatabase function
syncDatabase();



// Define routes from the second project
app.use('/api', userRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});



