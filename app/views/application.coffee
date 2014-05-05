View = Em.View.extend
  classNames: ['application-wrapper']
  didInsertElement: ->
    Em.run.scheduleOnce 'afterRender', =>
      @doResize()

      $(window).on 'resize', =>
        Em.run.debounce @, @doResize, 200

`export default View`