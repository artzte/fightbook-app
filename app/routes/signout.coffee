`import ajax from 'ic-ajax'`

Route = Ember.Route.extend
  beforeModel: ->
    ajax
        url: '/api/signout'
      .then =>
        @transitionTo '/'
        @set 'session.isAnon', true
        @set 'session.currentUser', null
`export default Route`
