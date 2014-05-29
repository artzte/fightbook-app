Page = DS.Model.extend
  slug: DS.attr 'string'
  title: DS.attr 'string'
  dziPath: DS.attr 'string'
  visibility: DS.attr 'string'
  state: DS.attr 'string'
  createdAt: DS.attr 'date'
  sections: DS.hasMany 'section'
  treatise: DS.belongsTo 'treatise'
  sortOrder: DS.attr 'number'

  # needed for store's reloadRecord to work
  id: (->
      @get '_id'
    ).property('_id')

  sectionsSorted: (->
      @get('sections').sortBy 'sortOrder'
    ).property('sections.@each.sortOrder')

  dziUrl: (->
      "#{ENV.DZI_BASE_URL}/#{@get('dziPath')}"
    ).property('dziPath')

  thumbUrl: (->
      thumb = @get('dziPath')
        .replace(/getty-dz/, 'getty-thumbs')
        .replace(/dzi/, 'jpg')
      "#{ENV.DZI_BASE_URL}/#{thumb}"
    ).property('dziPath')

  bounds: (->
      bounds = @get 'sections.@each.bounds'
      if bounds.get('length')>0
        top = null
        bottom = null
        left = null
        right = null
        bounds.forEach (bound) ->
          boundRight = bound.x + bound.width
          boundBottom = bound.y + bound.height
          top = bound.y if !top? || bound.y < top
          left = bound.x if !left? || bound.x < left
          bottom = boundBottom if !bottom? || boundBottom > bottom
          right = boundRight if !right? || boundRight > right
        new OpenSeadragon.Rect top, left, bottom-top, right-left
      else
        null
    ).property('sections.@each.bounds')

`export default Page`