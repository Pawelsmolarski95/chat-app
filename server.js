const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
const server = app.listen(8000, () => {
    console.log('Server is running');
})
const io = socket(server);

let messages = [];

io.on('connection', (socket) => {
    socket.on('message', (message) => { 
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
    })
  });
  



app.use(express.static(path.join(__dirname, '/client')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
  });


