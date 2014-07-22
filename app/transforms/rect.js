Transform = DS.Transform.extend
  deserialize: (serialized) ->
    if serialized
      new OpenSeadragon.Rect(serialized.x, serialized.y, serialized.width, serialized.height)
    else
      new OpenSeadragon.Rect()
  serialize: (deserialized) ->
    {
      x: deserialized.get('x')
      y: deserialized.get('y')
      width: deserialized.get('width')
      height: deserialized.get('height')
    }

`export default Transform`