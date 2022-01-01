const express = require('express');
const path = require('path');
require('dotenv').config();

const SERVER_PORT = process.env.PORT || 3001;

let app = express();

//ware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

//routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//startup
app.listen(SERVER_PORT)
console.log(`Synchro is now active on port ${SERVER_PORT}.`);