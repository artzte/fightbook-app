Transform = DS.Transform.extend
  deserialize: (serialized) ->
    Em.Object.create serialized
  serialize: (deserialized) ->
    {
      md: deserialized.get('md')
    }

`export default Transform`
