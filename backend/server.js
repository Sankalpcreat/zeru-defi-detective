require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const walletRoutes = require('./routes/walletRoutes');
const connectDB = require('./config/db');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 4000;

// Check and kill process only if the port is in use
exec(`lsof -ti :${PORT}`, (err, stdout) => {
  if (stdout) {
    console.log(`Port ${PORT} is in use. Killing process...`);
    exec(`kill -9 ${stdout.trim()}`, (killErr) => {
      if (killErr) {
        console.error(`Error killing process on port ${PORT}:`, killErr);
      } else {
        console.log(`Freed port ${PORT}`);
        startServer();
      }
    });
  } else {
    startServer();
  }
});


function startServer() {
  connectDB();

  app.use(express.json());

  // Routes
  app.use('/api/wallet', walletRoutes);

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
