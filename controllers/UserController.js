const UserModel = require('../models/User');

const UserController = {

  addProfile: (data, callback) => {
    let user = new UserModel();
    user.name = data.name;
    user.email = data.email;
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
    return UserModel.findOneAndUpdate(
        {_id: id},
        {$set: profile},
        {new: true},
        callback
    );
  },

  getUserProfile: (id, callback) => {
    return UserModel.findById(id).exec((err, userData) => {
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

module.exports = UserController;