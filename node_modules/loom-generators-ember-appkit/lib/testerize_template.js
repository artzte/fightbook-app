var inflector = require('./inflector');
var path = require('path');

// foo_bar/x_foo.hbs -> foo_bar/x_foo_tests.js
module.exports = function(savePath) {
  var basename = inflector.underscore(path.basename(savePath));
  var dirname = path.dirname(savePath);
  return dirname+'/'+basename;
};
