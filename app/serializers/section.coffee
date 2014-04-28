Serializer = DS.RESTSerializer.extend
  serialize: (section) ->
    bounds = section.get('bounds')
    return {
        title: section.get('title')
        page_ordinal: section.get('pageOrdinal')
        bounds:
          x: bounds.x
          y: bounds.y
          width: bounds.width
          height: bounds.height
      }

`export default Serializer`
