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

`export default Page`