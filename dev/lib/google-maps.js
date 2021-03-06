'use strict';

export default googleMaps;

import {request} from './http';
import extend from 'xtend';

const baseReqObj = {
    scheme: 'https',
    method: 'GET',
    hostname: 'maps.googleapis.com'
};

function googleMaps(config, apiKey) {
 return {
  getRoute: getRoute
 };

 function getRoute(origin, destination, travelMode='WALKING') {
   let reqData = {
     key: apiKey,
     origin: origin,
     destination: destination,
     travelMode: travelMode
   };

   return request(extend(baseReqObj, {
     path: '/maps/api/directions/json'
   }), reqData)
   .then(function (data) {
     return data;
   });
 }
}
