'use strict';

export default police;

import {request} from './http';
import extend from 'xtend';

const baseReqObj = {
    scheme: 'https',
    method: 'GET',
    hostname: 'data.police.uk'
};

function police() {
 return {
  getCrimes: getCrimes
 };
}

function getCrimes(lat, lon) {
  let reqData = {
    lat: lat,
    lng: lon
  };

  return request(extend(baseReqObj, {
    path: '/api/crimes-street/all-crime'
  }), reqData)
  .then(function (data) {
    return data;
  });
}
