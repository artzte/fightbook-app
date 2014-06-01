Route = Ember.Route.extend
  model: ->
    # return the current user as the model if authenticated, otherwise a blank object
    new Promise (resolve, reject) =>
      promise = $.ajax
        url: '/api/me'
        dataType: 'json'
      promise.done (result) =>
        user = new Ember.Object(result)
        if result.isAnon
          @set 'session.isAnon', true
          @set 'session.currentUser', null
        else
          @set 'session.isAnon', false
          @set 'session.currentUser', user
        resolve(user)
      promise.fail (result) ->
        reject()
  actions:
    signout: ->
      console.log "signout"
    error: (result, transition) ->
      if result.status is 403
        signinController = @controllerFor 'signin'
        signinController.set 'afterLoginTransition', transition
        @transitionTo 'signin'
`export default Route`
