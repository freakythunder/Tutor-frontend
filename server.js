// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.post('/api/execute', (req, res) => {
  const { code } = req.body;
  // Here you would typically send the code to a separate service for execution
  // For now, we'll just echo it back
  res.json({ output: `Executed code: ${code}` });
});

app.listen(port, () => console.log(`Listening on port ${port}`));