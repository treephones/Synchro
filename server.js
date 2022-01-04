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
      id: undefined,
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
  res.send([new Boolean(room), room ? room.roomName : 0]);
});

app.post('/mkrm/:roomID/:roomname', (req, res) => {
  let roomID = req.params.roomID;
  let roomName  = req.params.roomname;
  if(!rooms[roomID]) {
    rooms[roomID] = {
      roomName: roomName,
      roomID: roomID,
      connections: []
    }
    res.send([true]);
  }
  else {
    res.send([false]);
  }
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
    socket.join(data.from);
    let ishost = rooms[data.from].connections.length == 0;
    rooms[data.from].connections.push({
      id: socket.id,
      username: data.username,
      host: ishost
    });
    io.sockets.in(data.from).emit('message', {
      sender: "",
      time: getTime(),
      text: `Say hi! ${data.username} has just joined the chat!` 
    });
    // const clients = io.sockets.adapter.rooms.get(data.from);
    // clients.forEach(client => {
    //   console.log(client);
    // });

  });

  socket.on('disconnecting', (data) => {
    let rm = Array.from(socket.rooms)[1];
    let clients = Array.from(io.sockets.adapter.rooms.get(rm));
    if(clients.length == 1) {
      delete rooms[rm];
    }
    else {
      let conn = rooms[rm].connections.find(conn => conn.id == socket.id);
      rooms[rm].connections = rooms[rm].connections.filter(conn => conn.id != socket.id);
      if(conn.ishost) {
        rooms[rm].connections[Math.floor(Math.random()*rooms[rm].connections.length)].host = true;
      }
      io.sockets.in(rm).emit('message', {
        sender: "",
        time: getTime(),
        text: `${conn.username} has left the chat.`
      });
    }
  });

  socket.on('message', (data) => {
    socket.broadcast.to(data.from).emit('message', {
      sender: data.sender,
      time: getTime(),
      text: data.message
    });
  });

});