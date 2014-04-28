Route = Ember.Route.extend
  model: ->
    @get('store').find 'treatise'

`export default Route`