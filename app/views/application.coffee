View = Em.View.extend
  classNames: ['application-wrapper']
  didInsertElement: ->
    window.onresize = =>
      Em.run @, ->
        Em.run.debounce @, @doResize, 200
        Em.run.scheduleOnce 'afterRender', @, ->
          @doResize()
    window.onbeforeunload = =>
      controller = @get 'controller'
      if controller.get('updateQueue.length')
        controller.send 'flushUpdateQueue'
        return "Are you sure you want to navigate away before saving your changes?"

`export default View`
