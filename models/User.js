const mongoose  = require('mongoose');

const schema = new mongoose.Schema({
  email:    {
    type:     String,
    required: true,
    unique:   true,
    index:    true
  },
  name: {
    type:     String,
    required: true
  },
  challenges: {
    type:     [String],
    default: []
  },
  pastChallenges: {
    type:     [String],
    default: []
  }
});

module.exports = mongoose.model('User', schema);