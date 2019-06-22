const mapRouter = require("express").Router(),
      routeHelper = require('../helpers/routeHelper'),
      MapController = require('../controllers/MapController');

mapRouter.post("/get-directions", (req, res) => {
  const data = req.body;

  return MapController.getDistance(data, routeHelper.defaultResponse(req, res));
});

mapRouter.post("/get-distance-between", (req, res) => {
  const data = req.body;

  return MapController.getDistanceBetween(data, routeHelper.defaultResponse(req, res));
});

mapRouter.get('/get-stations', (req, res) => {
  return MapController.getStations(routeHelper.defaultResponse(req, res));
});

mapRouter.post("/get-closest-station", (req, res) => {
  const {address} = req.body;

  return MapController.getStation(address, routeHelper.defaultResponse(req, res));
});

mapRouter.get('/get-checkpoints', (req, res) => {
  return MapController.getCheckpoints(routeHelper.defaultResponse(req, res));
});

mapRouter.post('/achieve-point', (req, res) => {
  const {coordinates, checkPoint} = req.body;

  return MapController.checkDistanseToCheckpoint(coordinates, checkPoint, routeHelper.defaultResponse(req, res));
});

module.exports = mapRouter;

