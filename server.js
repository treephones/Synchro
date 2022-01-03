const express = require('express');
const cors = require('cors');
const sockets = require("socket.io");
const path = require('path');

require('dotenv').config();

const SERVER_PORT = process.env.PORT || 3001;

let rooms = {testid: {
  roomName: 'Test Room',
  roomID: 'testid',
  connections: [
    {
      socket: undefined,
      username:'tester'
    }
  ]
}};

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

let getTime = () => {
  var time = new Date();
  return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}

const io = sockets(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {

  socket.on('roomData', (data) => {
    rooms[data.from].connections.push({
      socket: socket,
      username: data.username
    });
    socket.join(data.from);
    io.sockets.in(data.from).emit('message', {
      sender: data.username,
      time: getTime(),
      text: `Say hi! ${data.username} has just joined the chat!` 
    });
    // const clients = io.sockets.adapter.rooms.get(data.from);
    // clients.forEach(client => {
    //   console.log(client);
    // });

  });

  socket.on('message', (data) => {
    socket.broadcast.to(data.from).emit('message', {
      sender: data.sender,
      time: getTime(),
      text: data.message
    });
  });

});