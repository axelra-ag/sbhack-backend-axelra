const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBPui8m2SN1pr_Fnaw8xKq_l0L9BQ8ZrSg',
  Promise: Promise
});
const googleGeometry = require('spherical-geometry-js');
const Stations = require('../stations');
const Checkpoints = require('../checkpoints');

const mapRouter = require("express").Router();

defaultResponse = (req, res) => {
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


const MapController = {

  getStations: async (callback) => {
    if(Stations) {
      return callback(null, {
        success: true,
        result: Stations
      })
    }

    return  callback('No stations');
  },

  getDistance: async (data, callback) => {
    try {
      let directionsInfo = await googleMapsClient.distanceMatrix({
        origins: [data.start],
        destinations: [data.end],
        mode: 'bicycling'
      }).asPromise();

      return callback(null, {
        success: true,
        result: directionsInfo.json
      });
    } catch (err) {
      callback(err)
    }
  },

  getStation: async (address, callback) => {
    try {
      let myCoordinates = await googleMapsClient.geocode({address}).asPromise();

      if(myCoordinates.json.results.length) {
        let closestStation = await find_closest_marker(myCoordinates.json.results[0].geometry.location);

        return callback(null, {
          success: true,
          result: closestStation
        })
      } else {
        callback('Address was not found');
      }
    } catch (err) {
      callback(err);
    }
  },

  getCheckpoints: async (callback) => {
    if(Checkpoints) {
      return callback(null, {
        success: true,
        result: Checkpoints
      })
    }

    return  callback('No stations');
  },

  checkDistanseToCheckpoint: async (coordinates, checkpointID, callback) => {
    const checkpoint = Checkpoints.find(x => x.id == checkpointID);
    let farAway = await googleGeometry.computeDistanceBetween(
        googleGeometry.convertLatLng(checkpoint.coordinates),
        googleGeometry.convertLatLng(coordinates)
    );

    if(parseInt(farAway) <= 20) {
      return callback(null, {
        success: true,
        data: {
          checkpoint,
          hash: Buffer.from(checkpoint.id+'-'+new Date()).toString('base64')
        }
      })
    } else {
      return callback('You are far away to the check point. Please come closer.')
    }
  }
};

module.exports = mapRouter;

function find_closest_marker( lat, lng ) {
  return new Promise(resolve => {
    var R = 6371; // radius of earth in km
    var distances = [];
    var closest = -1;
    for( let i=0; i<Stations.length; i++ ) {
      var mlat = Stations[i].coordinates[0];
      var mlng = Stations[i].coordinates[1];
      var dLat  = rad(mlat - lat);
      var dLong = rad(mlng - lng);
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;
      distances[i] = d;
      if ( closest === -1 || d < distances[closest] ) {
        closest = i;
      }
    }

    resolve(Stations[closest]);
  });

  function rad(x) {return x*Math.PI/180;}
}

function find_closest_marker2(lat, lng) {
  return new Promise(resolve => {
    let markers_distances = [];
    for (let i = 0; i < Stations.length; i++) {
      let distance = googleGeometry.computeDistanceBetween(Stations[i].coordinates, [lat, lng]);
      markers_distances[i] = {
        distance: distance,
        marker: Stations[i]
      }
    }
    let closest_markers = markers_distances.sort((a, b) => {return a.distance-b.distance});

    resolve(closest_markers[0]);
  });
}
