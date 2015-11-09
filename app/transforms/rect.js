import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    return new OpenSeadragon.Rect(serialized.x, serialized.y, serialized.width, serialized.height);
  },

  serialize: function(deserialized) {
    return {
      x: deserialized.x,
      y: deserialized.y,
      width: deserialized.width,
      height: deserialized.height
    };
  }
});
