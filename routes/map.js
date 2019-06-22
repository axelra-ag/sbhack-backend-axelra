const MapController = require('../controllers/MapController');

const mapRouter = require("express").Router();

const defaultResponse = (req, res) => {
  return function(err, data) {
    if (err) {
      return res.status(500).json({ success: false, message: err });
    } else {
      return res.json(data);
    }
  };
};

mapRouter.post("/get-directions", (req, res) => {
  const data = req.body;
  // const data = {
  //   start: 'Morgentalstrasse 67 8038 Zürich',
  //   end: 'Bahnhofstrasse 3, 8001 Zürich'
  // };

  return MapController.getDistance(data, defaultResponse(req, res));
});

mapRouter.post("/get-distance-between", (req, res) => {
  const data = req.body;

  return MapController.getDistanceBetween(data, defaultResponse(req, res));
});

mapRouter.get('/get-stations', (req, res) => {
  return MapController.getStations(defaultResponse(req, res));
});

mapRouter.post("/get-closest-station", (req, res) => {
  const {address} = req.body;
  // const address = 'Morgentalstrasse 67 8038 Zürich';

  return MapController.getStation(address, defaultResponse(req, res));
});

mapRouter.get('/get-checkpoints', (req, res) => {
  return MapController.getCheckpoints(defaultResponse(req, res));
});

mapRouter.post('/achieve-point', (req, res) => {
  const {coordinates, checkPoint} = req.body;

  return MapController.checkDistanseToCheckpoint(coordinates, checkPoint, defaultResponse(req, res));
});

module.exports = mapRouter;

