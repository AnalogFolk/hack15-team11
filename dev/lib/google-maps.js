'use strict';

export default googleMaps;

import {request} from './http';

const googleMapsBaseReqObj: {
  scheme: 'https',
  //'https://maps.googleapis.com/maps/api/directions/json'

}

function googleMaps(config) {
  
}


function getRoute(origin, locate, travelMode) {
  let reqObj = {
    method: 'GET'
    
  };

  request({
    method: 'GET',
    hostname: ''
  })
}
