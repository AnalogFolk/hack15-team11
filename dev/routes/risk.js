'use strict';

export default riskRouter;
import {Router as router} from 'express';
import {expressAsyncWrapper as wrap} from '../lib/util';
import dg from 'debug';

function riskRouter(config) {
  let debug = dg(`${config.get('debug').namespace}:route:risk`);
  let riskRoute = router();
  let {google, what3words, police} = config.get('apis');

  riskRoute.post('/', wrap(async function (req, res) {
    debug('get request');
    let [w1, w2, w3] = req.body.words;
    //let location = await what3words.getPosition(w1, w2, w3);
    let { position: destination } = await what3words.getPosition(w1, w2, w3);
    let googleRoutes = await google.getRoute(req.body.origin, `${destination[0]},${destination[1]}`);

    let route = googleRoutes.routes[0];
    let steps = [{lat: route.legs[0].start_location.lat, lon: route.legs[0].start_location.lng}];
    for (let s of route.legs[0].steps) {
      steps.push({lat: s.start_location.lat, lon: s.start_location.lng});
      steps.push({lat: s.end_location.lat, lon: s.end_location.lng});
    }
    steps.push({lat: route.legs[0].end_location.lat, lon: route.legs[0].end_location.lng});

    let allCrimes = [];
    let max = 2;
    let crimeIds = {};
    for (let s of steps) {
      let crimes = await police.getCrimes(s.lat, s.lon);
      for (let c of crimes) {
        if (!crimeIds[c.category]) {
          crimeIds[c.category] = c.category;
          allCrimes.push(c);
        }
      }
      //allCrimes.push(...crimes);
      max--;
      if (max <= 0) { break; }
    }

    res.json({
      destination: `${destination[0]},${destination[1]}`,
      crimes: allCrimes
    });
  }));

  return riskRoute;
}
