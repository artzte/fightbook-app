# todo - see page route for better approach for ensuring full record
`import BaseRoute from './_base'`

Route = BaseRoute.extend
  model: (params) ->
    store = @get 'store'
    treatise = store.all('treatise').findProperty('key', params.treatise_key)

    if treatise.get('pages.length')||0 > 0
      Ember.RSVP.Promise.resolve treatise
    @set 'title', treatise.get('title')
    else
      store.reloadRecord treatise

  setupController: (controller, treatise) ->
    @_super controller, treatise
    # @get('store').find('treatise', treatise.get('key'))
    
`export default Route`


