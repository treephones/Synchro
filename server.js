const express = require('express');
const cors = require('cors');
const sockets = require("socket.io");
const path = require('path');

require('dotenv').config();

const SERVER_PORT = process.env.PORT || 3001;

let rooms = {'swag': 12};

let app = express();

//ware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

//routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/:roomID', (req, res) => {
  let room = rooms[req.params.roomID];
  res.send([new Boolean(room)]);
});

//startup
let server = app.listen(SERVER_PORT);
console.log(`Synchro is now active on port ${SERVER_PORT}.`);

const io = sockets(server);
io.on('connection', (socket) => {
  console.log("");
});