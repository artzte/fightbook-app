Page = DS.Model.extend
  slug: DS.attr 'string'
  title: DS.attr 'string'
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
      "#{FbENV.APP.dziBaseUrl}/#{@get('treatise.key')}/dz/#{@get('slug')}.dzi"
    ).property('slug')

  thumbUrl: (vSize) ->
    "#{FbENV.APP.dziBaseUrl}/#{@get('treatise.key')}/thumbs/pages/#{@get('slug')}-#{vSize}.jpg"

  thumbSmall: (->
      @thumbUrl(150)
    ).property('slug', 'treatise.key')

  thumbLarge: (->
      @thumbUrl(300)
    ).property('slug', 'treatise.key')

  bounds: (->
      bounds = @get 'sections.@each.bounds'
      if bounds.get('length')>0
        lefts = bounds.getEach 'x'
        tops = bounds.getEach 'y'
        rights = bounds.map (bound) ->
          bound.x + bound.width
        bottoms = bounds.map (bound) ->
          bound.y + bound.height

        top = tops.sort().shift()
        left = lefts.sort().shift()
        bottom = bottoms.sort().pop()
        right = rights.sort().pop()
        new OpenSeadragon.Rect left, top, right-left, bottom-top
      else
        null
    ).property('sections.@each.bounds')

`export default Page`
