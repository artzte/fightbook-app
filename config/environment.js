/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'fb-app',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-eval' http://fast.fonts.net http://www.google-analytics.com/analytics.js",
      'font-src': "'self' http://fast.fonts.net", // Allow fonts to be loaded from http://fonts.gstatic.com
      'connect-src': "'self' http://s3-us-west-2.amazonaws.com", // Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
      'img-src': "'self' http://s3-us-west-2.amazonaws.com http://www.google-analytics.com",
      'style-src': "'self' 'unsafe-inline' http://fast.fonts.net", // Allow inline styles and loaded CSS from http://fonts.googleapis.com 
      'media-src': "'self'"
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
    ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
    // override
    //ENV.APP.dziBaseUrl = '//dev.media.incrossada.org';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
