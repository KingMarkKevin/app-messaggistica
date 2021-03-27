const express = require('express');
const app = express();
const port = 3000;
const socketIO = require('socket.io');

const server = app.listen(port, () => {
    console.log(`Server connection on http://127.0.0.1:${port}`);

})

io = socketIO(server);

io.on('connection', socket => {
    console.log(`Socket: client connected`);
    socket.on('new-message', (message) => {
        io.emit('resp-message', message);
        console.log(message);
    });
});