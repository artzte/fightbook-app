Controller = Em.Controller.extend
  actions:
    signin: ->
      promise = $.ajax
        url: '/api/signin'
        method: 'post'
        data:
          email: @get 'email'
          password: @get 'password'
      promise.done (result) ->
        console.log result
      promise.fail (result) ->
        try
          console.log JSON.parse(result.responseText)
        catch
          console.log "error"

`export default Controller`
