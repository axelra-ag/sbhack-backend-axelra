const challengesRouter = require("express").Router(),
      ChallengeModel = require('../models/Challenge'),
      UserModel = require('../models/User');

const defaultResponse = (req, res) => {
  return function(err, data) {
    if (err) {
      return res.status(500).json({ success: false, message: err });
    } else {
      return res.json(data);
    }
  };
};

challengesRouter.get("/", function (req, res) {
  return ChallengeController.getChallenges(defaultResponse(req, res));
});

challengesRouter.post("/my-challenges", function (req, res) {
  const {userID} = req.body;

  return ChallengeController.getMyChallenges(userID, defaultResponse(req, res));
});

challengesRouter.post("/start", function(req, res) {
  const {challengeID, userID} = req.body;

  return ChallengeController.start(challengeID, userID, defaultResponse(req, res));
});

challengesRouter.post("/end", function(req, res) {
  const {challengeID, userID} = req.body;

  return ChallengeController.end(challengeID, userID, defaultResponse(req, res));
});

const ChallengeController = {

  getChallenges: (callback) => {
    return ChallengeModel.find({}).exec(callback);
  },

  getMyChallenges: (userID, callback) => {
    UserModel.findById(userID)
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
    ChallengeModel.findById(challengeID).exec((err, challengeData) => {
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
    ChallengeModel.findById(challengeID).exec((err, challengeData) => {
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

module.exports = challengesRouter;