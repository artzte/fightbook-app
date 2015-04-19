/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app'),
  mergeTrees = require('broccoli-merge-trees'),
  pickFiles = require('broccoli-static-compiler');

var app = new EmberApp({
  sassOptions: {
    includePaths: [
      'bower_components/foundation/scss'
    ]
  }
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

app.import('vendor/analytics/analytics.js');
app.import('bower_components/openseadragon/built-openseadragon/openseadragon/openseadragon.js');
app.import('bower_components/xregexp/min/xregexp-min.js');
app.import('bower_components/ember-google-analytics/ember-google-analytics.js');
app.import('bower_components/ember-responsive/dist/ember-responsive.js');
app.import('bower_components/ember-data.model-fragments/dist/ember-data.model-fragments.js');
app.import('vendor/openseadragon-imaginghelper/openseadragon-imaginghelper.js');
app.import('bower_components/markdown-js/lib/markdown.js');

var icomoon = pickFiles('vendor/icomoon', {
    srcDir: '/',
    files: ['style.css','fonts/*.*'],
    destDir: 'assets'
  });

module.exports = mergeTrees([
  icomoon,
  app.toTree()
]);
