Route = Ember.Route.extend
  beforeModel: ->
    unless @get 'session.isAnon'
      @transitionTo 'treatises'
  model: ->
    Ember.Object.create()
`export default Route`
