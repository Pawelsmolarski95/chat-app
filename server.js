const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
const server = app.listen(8000, () => {
    console.log('Server is running');
});

const io = socket(server);

let messages = [];
let users = [];

io.on('connection', (socket) => {
    socket.on('join', (userName) => { 
        users.push({ name: `${userName}`, id: `${socket.id}`});
        socket.broadcast.emit('newUser', {
            author:'Chat-Bot',
            content: `${userName} has joined the conversation`
        });
    })
    socket.on('message', (message) => { 
        messages.push(message);
        socket.broadcast.emit('message', message);
    }),
    socket.on('disconnect', () => {
        if (users.length > 0) {
          const activeUsers = users.filter(user => user.id !== socket.id);
          const exitUser = users.filter(user => user.id === socket.id)[0].name;
          
          socket.broadcast.emit('exitUser', {
            author: 'Chat-Boot',
            content: `${exitUser} `+ ' has left the conversation...'
          })
          users = activeUsers;
        }
      })
});

    
  



app.use(express.static(path.join(__dirname, '/client')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
  });


