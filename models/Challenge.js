const mongoose  = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type:     String,
    required: true
  },
  status: {
    type:     Boolean,
    required: true,
    default:  false,
  }
});

module.exports = mongoose.model('Challenge', schema);