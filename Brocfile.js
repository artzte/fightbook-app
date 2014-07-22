/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  name: require('./package.json').name,

  // for some large projects, you may want to uncomment this (for now)
  es3Safe: true,

  minifyCSS: {
    enabled: true,
    options: {}
  },

  getEnvJSON: require('./config/environment')
});

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

app.import({
  development: 'vendor/ember-data/ember-data.js',
  production:  'vendor/ember-data/ember-data.prod.js'
}, {
  exports: {
    'ember-data': [
      'default'
    ]
  }
});

app.import('vendor/ic-ajax/dist/named-amd/main.js', {
  exports: {
    'ic-ajax': [
      'default',
      'defineFixture',
      'lookupFixture',
      'raw',
      'request',
    ]
  }
});

app.import('vendor/openseadragon/built-openseadragon/openseadragon/openseadragon.js', {
  exports: {
    'openseadragon': [
      'default'
    ]
  }
});



app.import('vendor/foundation/js/foundation.js');
app.import('vendor/ember-google-analytics/ember-google-analytics.js');
app.import('vendor/ember-responsive/dist/ember-responsive.js');
app.import('vendor/openseadragon/built-openseadragon/openseadragon/openseadragon.js');
app.import('vendor/openseadragonimaginghelper/openseadragon-imaginghelper.js');


module.exports = app.toTree();
