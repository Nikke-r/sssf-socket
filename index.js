'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', socket => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join', room => {
        socket.join(room);

        socket.on('chatMessage', message => {
            io.sockets.in(room).emit('chatMessage', message)
        });
    });
});

http.listen(3000, () => console.log('App running!'));