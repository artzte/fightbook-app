import DS from "ember-data";

export default DS.RESTSerializer.extend({
  normalize: function(type, hash, prop) {
    hash.translation = hash.translation || {md: '', html: ''};
    hash.bounds = hash.bounds || {x: 0, y: 0, width: 1, height: 1};
    return this._super(type, hash, prop);
  },
  serialize: function(section) {
    var bounds = section.get('bounds'),
        json = {
          title: section.get('title'),
          page_ordinal: section.get('pageOrdinal'),
          bounds: {
            x: bounds.x,
            y: bounds.y,
            width: bounds.width,
            height: bounds.height
          }
        },
    physicalBounds = section.get('physicalBounds');

    if (physicalBounds) {
      json.physicalBounds = {
        x: physicalBounds.x,
        y: physicalBounds.y,
        width: physicalBounds.width,
        height: physicalBounds.height
      };
    }
    return json;
  }
});
