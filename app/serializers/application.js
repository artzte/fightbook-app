import DS from "ember-data";

var exclude = ['__v'];

export default DS.RESTSerializer.extend();
/*{
  normalize: function(type, hash, prop) {
    var i;
    for(i = 0; exclude[i]; i++) {
      delete hash[i];
    }
    return this._super(type, hash, prop);
  }
});
*/
