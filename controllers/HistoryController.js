const HistoryModel = require('../models/History'),
      UserModel = require('../models/User'),
      ObjectId = require('mongodb').ObjectID;

const HistoryController = {
  add: (data, callback) => {
    let record = new HistoryModel();
    record.startStation = data.startStation;
    record.endStation = data.endStation;
    record.reward = data.reward;
    record.distance = data.distance;
    record.date = Date.now();
    record.user = ObjectId(data.userId);
    record.ephiriumId = data.rideId;

    record.save(err => {
      if (err) {
        return callback(err);
      }

      return callback(null, {
        success: true,
        data: record
      })
    });
  },

  getHistoryByUserID: (userId, callback) => {
    // HistoryModel.find({user: ObjectId(userId)}).exec((err, data) => {
    //   if(err) return callback(err);
    //
    //   return callback(null, {
    //     success: true,
    //     result: data
    //   })
    // });
  }
};

module.exports = HistoryController;