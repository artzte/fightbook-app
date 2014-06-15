View = Em.View.extend
  classNames: ['application-wrapper']
  didInsertElement: ->
    $(window).on 'resize', =>
      Em.run @, ->
        Em.run.debounce @, @doResize, 200
        Em.run.scheduleOnce 'afterRender', @, ->
          @doResize()

`export default View`
