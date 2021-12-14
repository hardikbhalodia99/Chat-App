const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MessageSchema = new Schema({
  sender: { type: String },
  room: { type: String },
  message: String,
})

module.exports = mongoose.model('Message', MessageSchema)
