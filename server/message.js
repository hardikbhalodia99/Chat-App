const messageModel = require('./models/message')
const { getUser } = require('./users')
module.exports.sendMessage = async (socket, message) => {
  try {
    const user = getUser(socket.id)
    console.log(socket.id)
    const messageCreated = await messageModel.create({
      message: message,
      user: user,
      room: user.room,
    })

    if (!messageCreated) {
      return {
        success: false,
        message: 'Failed to create new message in collection!',
        data: null,
      }
    }

    return {
      success: true,
      message: 'Message ',
      data: null,
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: 'Server Error! Failed to create new message!',
      data: error,
    }
  }
}
