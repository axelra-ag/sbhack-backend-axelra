const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
  startStation: {
    type: Number,
    default: null
  },
  endStation: {
    type: Number,
    default: null
  },
  reward: {
    type: Number,
    default: null
  },
  distance: {
    type: Number,
    default: null
  },
  date:    {
    type:    Number,
    default: Date.now(),
  },
  user: {
    type: Schema.Types.ObjectId, ref: 'User',
  },
  challenge: {
    type: Schema.Types.ObjectId, ref: 'Challenge',
  }
});

module.exports = mongoose.model('History', schema);