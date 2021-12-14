const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const cors = require('cors')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const router = require('./router')
require('./config/db.config')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const messageModel = require('./models/message')
const { sendMessage } = require('./message')

app.use(cors())
app.use(router)

io.on('connect', (socket) => {
  //called when new user joins a room
  socket.on('join', async ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error) return callback(error)

    socket.join(user.room)

    socket.emit('message', {
      user: `${user.name}`,
      text: `${user.name}, welcome to room ${user.room}.`,
    })
    socket.broadcast.to(user.room).emit('message', {
      user: `${user.name}`,
      text: `${user.name} has joined!`,
    })

    const result = await messageModel.create({
      room: user.room,
    })

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
      chats: result,
    })

    callback()
  })

  //send messages
  socket.on('sendMessage', async (message, callback) => {
    const user = getUser(socket.id)
    console.log(user)
    io.to(user.room).emit('message', { user: user.name, text: message })
    await messageModel.create({
      message: message,
      user: user,
      room: user.room,
    })
    callback()
  })

  // to disconnect user
  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('message', {
        user: 'Admin',
        text: `${user.name} has left.`,
      })
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      })
    }
  })
})

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`),
)
