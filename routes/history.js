const historyRouter = require("express").Router(),
      routeHelper = require('../helpers/routeHelper'),
      HistoryController = require('../controllers/HistoryController');

historyRouter.post("/add", (req, res) => {
  const data = req.body;

  return HistoryController.add(data, routeHelper.defaultResponse(req, res));
});

historyRouter.post("/get-history", (req, res) => {
  const {userId} = req.body;

  return HistoryController.getHistoryByUserID(userId, routeHelper.defaultResponse(req, res));
});

module.exports = historyRouter;