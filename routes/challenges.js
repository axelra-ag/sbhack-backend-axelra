const challengesRouter = require("express").Router(),
      ChallengeModel = require('../models/Challenge');

defaultResponse = (req, res) => {
  return function(err, data) {
    if (err) {
      return res.status(500).json({ success: false, message: err });
    } else {
      return res.json(data);
    }
  };
};

challengesRouter.post("/start", function(req, res, next) {
  // const data = req.body;

  return ChallengeController.start('1', defaultResponse(req, res));
});

challengesRouter.post("/end", function(req, res, next) {
  // const data = req.body;

  return ChallengeController.end('1', defaultResponse(req, res));
});

const ChallengeController = {

  start: (id, callback) => {

    return callback(null, {
      success: true,
      data: {

      }
    })
  },

  end: (id, callback) => {

    return callback(null, {
      success: true,
      data: {

      }
    })
  }

};

module.exports = challengesRouter;