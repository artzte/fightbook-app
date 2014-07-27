/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      dziBaseUrl: '//s3-us-west-2.amazonaws.com/media.incrossada.org',
      title: 'la incrossada',
      keystonePath: '/keystone'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.dziBaseUrl = '/media';
    ENV.APP.keystonePath = 'http://localhost:3004/keystone'
  }

  if (environment === 'test') {

  }

  if (environment === 'production') {

  }

  return ENV;
};
