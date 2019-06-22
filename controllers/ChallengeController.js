const ChallengeModel = require('../models/Challenge'),
      UserModel = require('../models/User');

const ChallengeController = {

  getChallenges: (callback) => {
    return ChallengeModel.find({}).exec(callback);
  },

  getMyChallenges: (userID, callback) => {
    return UserModel.findById(userID)
        .populate('challenges')
        .populate('pastChallenges')
        .exec((err, userData) => {
          if(err) {
            return callback(err);
          }

          return callback(null, {
            success: true,
            result: userData
          })
        });
  },

  start: (challengeID, userID, callback) => {
    return ChallengeModel.findById(challengeID).exec((err, challengeData) => {
      if(err) {
        return callback(err);
      }

      if(challengeData && challengeData.status) {
        UserModel.findOneAndUpdate({
          _id: userID
        },{
          $push: {challenges: [challengeID]},
        }, {
          new: true
        }, callback);
      } else {
        return callback('Challenge is not active.')
      }
    });
  },

  end: (challengeID, userID, callback) => {
    return ChallengeModel.findById(challengeID).exec((err, challengeData) => {
      if(err) {
        return callback(err);
      }

      if(challengeData.status) {
        UserModel.findOneAndUpdate({
          _id: userID
        }, {
          $pull: { challenges: challengeID },
          $push: { pastChallenges: [challengeID] },
        }, {
          new: true
        }, callback);
      } else {
        return callback('Challenge is not active.')
      }
    });
  }

};

module.exports = ChallengeController;