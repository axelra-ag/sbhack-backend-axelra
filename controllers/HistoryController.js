const HistoryModel = require('../models/History'),
      UserModel = require('../models/User');

const HistoryController = {
  add: (data) => {
    let record = new HistoryModel();
    record.startStation = data.startStation;
    record.endStation = data.endStation;
    record.reward = data.reward;
    record.distance = data.distance;
    record.date = Date.now();
    record.user = data.distance;

    record.save();
  }
};

module.exports = HistoryController;