const challengesRouter = require("express").Router(),
      routeHelper = require('../helpers/routeHelper'),
      ChallengeController = require('../controllers/ChallengeController');

challengesRouter.get("/", (req, res) => {
  return ChallengeController.getChallenges(routeHelper.defaultResponse(req, res));
});

challengesRouter.post("/my-challenges", (req, res) => {
  const {userID} = req.body;

  return ChallengeController.getMyChallenges(userID, routeHelper.defaultResponse(req, res));
});

challengesRouter.post("/start", (req, res) => {
  const {challengeID, userID} = req.body;

  return ChallengeController.start(challengeID, userID, routeHelper.defaultResponse(req, res));
});

challengesRouter.post("/end", (req, res) => {
  const {challengeID, userID} = req.body;

  return ChallengeController.end(challengeID, userID, routeHelper.defaultResponse(req, res));
});

module.exports = challengesRouter;