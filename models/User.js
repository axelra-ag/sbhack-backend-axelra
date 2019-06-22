const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

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
    type:     [{ type: Schema.Types.ObjectId, ref: 'Challenge' }],
    default: []
  },
  pastChallenges: {
    type:     [{ type: Schema.Types.ObjectId, ref: 'Challenge' }],
    default: []
  }
});

module.exports = mongoose.model('User', schema);