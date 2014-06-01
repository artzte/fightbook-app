Controller = Em.Controller.extend
  actions:
    signin: ->
      promise = $.ajax
        url: '/api/signin'
        method: 'post'
        data:
          email: @get 'email'
          password: @get 'password'
      promise.done (result) =>
        @set('session.currentUser', Em.Object.create(result))
        @set('session.isAnon', false)
        transition = @get 'afterLoginTransition'
        if transition
          @set 'afterLoginTransition', null
          transition.retry()
        else
          @transitionTo 'treatises'
      promise.fail (result) ->
        try
          result = JSON.parse(result.responseText)
        catch
          result = {error: 'sign-in was unsuccessful'}

`export default Controller`
