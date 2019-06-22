const userRouter = require("express").Router(),
      routeHelper = require('../helpers/routeHelper'),
      UserController = require('../controllers/UserController');

userRouter.post("/add", function(req, res) {
  const data = req.body;

  return UserController.addProfile(data, routeHelper.defaultResponse(req, res));
});

userRouter.post("/edit", function(req, res) {
  const {userID} = req.body,
        profile = req.body;

  delete profile.userID;

  return UserController.editProfile(userID, profile, routeHelper.defaultResponse(req, res));
});

userRouter.post("/profile", function(req, res) {
  const {userID} = req.body;

  return UserController.getUserProfile(userID, routeHelper.defaultResponse(req, res));
});

module.exports = userRouter;