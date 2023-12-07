require('dotenv').config();

const server = require('./api/server');
const io = require('socket.io')
const socketIO = io(server, {
  cors: {
    origin: process.env.ORIGIN
  },
  secure: true,
  withCredentials: true
})
const express = require('express');
const app = express()

const port = process.env.PORT || 3301;

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
    socket.on('regis user', function(data) {
      users.push({id: socket.id, isAdmin: false})
      console.log('Regis user '+socket.id)
    })
    socket.on('regis admin', function(data) {
      users.push({id: socket.id, isAdmin: false})
      console.log('Regis user '+socket.id)
    })
});
socketIO.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
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


// setTimeout(() => {

// }, 2000)
server.listen({ port }, () => console.log(
  `🚀 Server ready at http://localhost:${port}/api`,
));