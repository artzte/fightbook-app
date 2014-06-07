Controller = Em.ObjectController.extend
  needs: ['application', 'page/section']
  zoomStops: [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 5]
  init: ->
    @_super()
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

  actions: {
    'submit': ->
      @set 'zoom', @get 'sdZoom'
      false

    sectionMoved: (section, newBounds, newPhysicalBounds, performSave = true) ->
      section.set 'bounds', newBounds
      section.set 'physicalBounds', newPhysicalBounds
      if performSave
        section.save()

    sdZoom: (zoom) ->
      @set 'sdZoom', zoom

    sdBounds: (bounds) ->
      @set 'sdBounds', bounds

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
  }

`export default Controller`
