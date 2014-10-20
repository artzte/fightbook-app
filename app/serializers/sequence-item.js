import DS from "ember-data";

export default DS.RESTSerializer.extend({
  normalize: function(type, hash, prop) {
    hash.commentary = hash.commentary || {md: '', html: ''};
    return this._super(type, hash, prop);
  }
});
