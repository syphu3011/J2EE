require('dotenv').config();

const server = require('./api/server');
const socketIO = require('socket.io')(server, {
  cors: {
    origin: 'https://vmtp.id.vn:8080'
  }
})
const express = require('express');
const app = express()

const port = process.env.PORT || 3301;

process.on('uncaughtException', (err) => {
  console.error(`${(new Date()).toUTCString()} uncaughtException:`, err);
  process.exit(0);
});
process.on('SIGINT', (err) => {
  console.error(`${(new Date()).toUTCString()} SIGINT:`, err);
  process.exit(0);
});
process.on('SIGTERM', (err) => {
  console.error(`${(new Date()).toUTCString()} SIGTERM:`, err);
  process.exit(0);
});

process.on('ELIFECYCLE', (err) => {
  console.error(`${(new Date()).toUTCString()} ELIFECYCLE:`, err);
  process.exit(0);
});
process.on('unhandledRejection', (err) => {
  console.error(`${(new Date()).toUTCString()} unhandledRejection:`, err);
});

let users = []
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`)  
    socket.on("message", data => {
      socketIO.emit("messageResponse", data)
    })

    socket.on("typing", data => (
      socket.broadcast.emit("typingResponse", data)
    ))

    socket.on("newUser", data => {
      users.push(data)
      socketIO.emit("newUserResponse", users)
    })
 
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
      users = users.filter(user => user.socketID !== socket.id)
      socketIO.emit("newUserResponse", users)
      socket.disconnect()
    });
    socket.on('chat message',function(data)
        {
          socketIO.emit('chat message', {msg: data.msg, id: data.id});
        });
});
socketIO.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
// setTimeout(() => {

// }, 2000)
server.listen({ port }, () => console.log(
  `🚀 Server ready at http://localhost:${port}/api`,
));