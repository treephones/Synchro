const express = require('express');
require('dotenv').config();

const SERVER_PORT = process.env.PORT || 3001;

let app = express();
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send('synchro');
});

//startup
app.listen(SERVER_PORT)
console.log(`Synchro is now active on port ${SERVER_PORT}.`);