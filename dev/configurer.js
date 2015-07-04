'use strict';

export default getConfig;

import googleAPI from './lib/google-maps';
import what3words from './lib/what-3-words';
import police from './lib/police';

const winston = require('winston');

function getConfig() {
  let keys = require('../keys.json');
  let env = getEnvVariables();
  //let isProduction = env.node === 'production';

  let config = {
    env: env.node,
    server: {
      port: env.port
    },
    debug: {
      namespace: 'hack'
    },
    middlewares: {
      logger: {
        format: 'combined'
      }
    },
    logger: winston,
    cache: {
      pages: 3600
    },
    apis: { }
  };

  config.apis.google = googleAPI(config, keys.google);
  config.apis.what3words = what3words(config, keys.what3words);
  config.apis.police = police(config);

  return Promise.resolve(new Map(setIterabilityToObj(config)));
}

function getEnvVariables() {
  let env = process.env;
  return {
    node: env.NODE_ENV,
    port: env.IFC_PORT || 4000
  };
}

function setIterabilityToObj(obj) {
  obj[Symbol.iterator] = function* () {
    let keys = Object.keys(this);

    for (let k of keys) {
      yield [k, this[k]];
    }
  };

  return obj;
}
