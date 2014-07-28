import DS from "ember-data";

export default DS.Transform.extend({
  deserialize: function(serialized) {
    if (serialized) {
      return new OpenSeadragon.Rect(serialized.x, serialized.y, serialized.width, serialized.height);
    } else {
      return new OpenSeadragon.Rect();
    }
  },
  serialize: function(deserialized) {
    return {
      x: deserialized.get('x'),
      y: deserialized.get('y'),
      width: deserialized.get('width'),
      height: deserialized.get('height')
    };
  }
});

