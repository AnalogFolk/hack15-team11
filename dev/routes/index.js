'use strict';

export default routes;

function routes(config) {
  return {
    '/': require('./home')(config),
    '/risk': require('./risk')(config)
  };
}
