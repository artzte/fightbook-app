Section = DS.Model.extend
  visibility: DS.attr 'string'
  page: DS.belongsTo 'page'
  sortOrder: DS.attr 'number'
  sequences: DS.hasMany 'sequence'
  translation: DS.attr 'markdown'
  bounds: DS.attr 'rect'
  state: DS.attr 'string'
  createdAt: DS.attr 'date'

  excerpt: (->
    translation = @get('translation.md')||''
    translation.substr 0, 100
  ).property('translation')

`export default Section`