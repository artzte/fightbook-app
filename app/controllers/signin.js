`import ajax from 'ic-ajax'`

Controller = Em.Controller.extend
  actions:
    signin: ->
      controller = @
      ajax
          url: '/api/signin'
          method: 'post'
          data:
            email: @get 'email'
            password: @get 'password'
        .then (result) ->
              controller.set('session.currentUser', Em.Object.create(result))
              controller.set('session.isAnon', false)
              controller.set('errorResult', undefined)
              transition = controller.get 'afterLoginTransition'
              if transition
                controller.set 'afterLoginTransition', null
                transition.retry()
              else
                controller.transitionTo 'treatises'
          ,
            (result) ->
              Em.run ->
                controller.set 'errorResult', result.jqXHR.responseJSON
`export default Controller`
