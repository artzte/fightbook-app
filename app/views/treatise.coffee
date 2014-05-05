View = Em.View.extend
  didInsertElement: ->
    Em.run.scheduleOnce 'afterRender', =>
      @doResize()

`export default View`