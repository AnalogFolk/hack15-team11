'use strict';

export default what3words;

import {request} from './http';
import extend from 'xtend';

const baseReqObj = {
    scheme: 'https',
    method: 'GET',
    hostname: 'api.what3words.com'
};

function what3words(config, apiKey) {
 return {
  getPosition: getPosition
 };

 function getPosition(word1, word2, word3) {
   let reqData = {
     key: apiKey,
     string: `${word1}.${word2}.${word3}`
   };

   return request(extend(baseReqObj, {
     path: '/w3w'
   }), reqData)
   .then(function (data) {
     return data;
   });
 }
}
