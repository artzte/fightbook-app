Route = Ember.Route.extend
  beforeModel: ->
    $.get('/api/signout').done =>
      @transitionTo '/'
      @set 'session.isAnon', true
      @set 'session.currentUser', null
`export default Route`
