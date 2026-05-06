const express = require('express');
const path = require('path');
const app = express();

// Serve all static files from the root directory
app.use(express.static(__dirname));

// Catch-all route to serve index.html for SPA support
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Export the app for Vercel's serverless environment
module.exports = app;
