const mongoose = require('mongoose');


const SessionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    required: true
  },
  audioName: {
    type: String,
    required: true
  },
  audioId: {
    type: String,
    required: true
  },
  audioDuration: {
    type: String,
    required: true
  },
  audioUrl: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }  
})

module.exports = mongoose.model('user', SessionSchema)