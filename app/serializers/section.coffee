Serializer = DS.RESTSerializer.extend
  serialize: (section) ->
    bounds = section.get('bounds')
    json = {
        title: section.get('title')
        page_ordinal: section.get('pageOrdinal')
        bounds:
          x: bounds.x
          y: bounds.y
          width: bounds.width
          height: bounds.height
      }
    physicalBounds = section.get 'physicalBounds'
    if physicalBounds
      json.physicalBounds =
        x: physicalBounds.x
        y: physicalBounds.y
        width: physicalBounds.width
        height: physicalBounds.height
    json

`export default Serializer`
