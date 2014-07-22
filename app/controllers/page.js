Controller = Em.ObjectController.extend
  needs: ['application', 'page/section', 'treatises', 'treatise']
  zoomStops: [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 5]
  init: ->
    @_super()
    Em.run ->
      Em.run.scheduleOnce 'afterRender', ->
        $(window).trigger('resize')
  nextPage: (->
      treatise = @get 'treatise'
      @get('treatise').nextPage @get('content')
    ).property('content', 'treatise.isSettled', 'treatise.pages.@each')
  prevPage: (->
      treatise = @get 'treatise'
      @get('treatise').prevPage @get('content')
    ).property('content', 'treatise.isSettled', 'treatise.pages.@each')

  actions:
    sectionMoved: (section, newBounds, newPhysicalBounds) ->
      section.set 'bounds', newBounds
      section.set 'physicalBounds', newPhysicalBounds
      updateQueue = @get 'updateQueue'
      updateQueue.set('content', []) unless updateQueue.get('content')
      unless updateQueue.findProperty 'id', section.get('id')
        updateQueue.pushObject section
      false

    sdZoom: (zoom) ->
      @set 'sdZoom', zoom
      false

    sdBounds: (bounds) ->
      @set 'sdBounds', bounds
      false

    zoomIn: ->
      sdZoom = @get 'sdZoom'
      larger = @zoomStops.filter (item) ->
        item > sdZoom
      newZoom = larger.get('firstObject')
      if newZoom?
        @set 'zoom', newZoom
      false

    zoomOut: ->
      sdZoom = @get 'sdZoom'
      smaller = @zoomStops.filter (item) ->
        item < sdZoom
      newZoom = smaller.get('lastObject')
      if newZoom?
        @set 'zoom', newZoom
      false

`export default Controller`