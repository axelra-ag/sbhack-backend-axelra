const userRouter = require("express").Router(),
      UserModel = require('../models/User');

defaultResponse = (req, res) => {
  return function(err, data) {
    if (err) {
      return res.status(500).json({ success: false, message: err });
    } else {
      return res.json(data);
    }
  };
};

userRouter.post("/add", function(req, res, next) {
  // const data = req.body;

  return UserController.addProfile('1', defaultResponse(req, res));
});

userRouter.post("/edit", function(req, res, next) {
  // const data = req.body;

  return UserController.editProfile('1', defaultResponse(req, res));
});

userRouter.post("/profile", function(req, res, next) {
  // const data = req.body;

  return UserController.getUserProfile('1', defaultResponse(req, res));
});

const UserController = {

  addProfile: (data, callback) => {
    let user = new UserModel();
    user.name = 'Mike';
    user.email = 'test@google.com';
    user.save(err => {
      if (err) {
        return callback(err);
      }

      return callback(null, {
        success: true,
        data: user
      })
    });
  },

  editProfile: (id, profile, callback) => {
    UserModel.findOneAndUpdate(
      {_id: id},
      {$set: {profile}},
      {new: true},
      callback
    );
  },

  getUserProfile: (id, callback) => {
    UserModel.findById(id).exec((err, userData) => {
      if(err) {
        return callback(err);
      }

      return callback(null, {
        success: true,
        data: userData
      })
    });
  }

};

module.exports = userRouter;