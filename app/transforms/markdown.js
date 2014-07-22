export default DS.Transform.extend({
  deserialize: function(serialized) {
    return Em.Object.create(serialized);
  },
  serialize: function(deserialized) {
    return {
      md: deserialized.get('md')
    };
  }
});
