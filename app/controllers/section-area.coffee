Controller = Em.ObjectController.extend
  needs: ['application']
  init: ->
    @_super()
  isSelected: (->
      console.log "checking isSelected"
      true
    ).property()

`export default Controller`
