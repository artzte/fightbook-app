Treatise = DS.Model.extend
  title: DS.attr 'string'
  key: DS.attr 'string'
  visibility: DS.attr 'string'
  state: DS.attr 'string'
  createdAt: DS.attr 'date'
  pages: DS.hasMany 'page'

  pagesSorted: (->
      @get('pages').sortBy('sortOrder')
    ).property('pages.@each.sortOrder')

  nextPage: (page) ->
    pages = @get 'pagesSorted'
    return null if Em.isEmpty pages

    index = pages.indexOf page
    return if index == -1

    if index == pages.lastIndexOf()
      null
    else
      pages.objectAt index+1

  prevPage: (page) ->
    pages = @get 'pagesSorted'
    return null if Em.isEmpty pages

    index = pages.indexOf page
    return if index <= 0

    pages.objectAt index-1

`export default Treatise`