Component = Ember.Component.extend
  classNames: ['page-image']

  updateSource: (->
      @get('sdViewer').open @get 'dziUrl'
    ).observes('dziUrl')

  actions:
    # proxy the drag start through to the container view and record the start position
    sectionDragStart: (section, e) ->
      @sendAction 'sectionDragStart', section, e
      @set 'sectionDragStartPosition',
        x: e.originalEvent.pageX
        y: e.originalEvent.pageY

    sectionSizeStart: (section, handle, e) ->
      @sendAction 'sectionSizeStart', section, handle, e
      @set 'handleDragStartPosition',
        handle: handle
        x: e.originalEvent.pageX
        y: e.originalEvent.pageY
      console.log @get('handleDragStartPosition')

  dragOver: (ev) ->
    ev.preventDefault()

  # surfaces a section-moved message when the section rectangle is dropped
  drop: (ev) ->
    sectionId = ev.dataTransfer.getData('text/data')
    section = @get('sections').findBy('id', sectionId)
    bounds = section.get 'bounds'

    dragEndPosition =
      x: ev.originalEvent.pageX
      y: ev.originalEvent.pageY

    handleDragStartPosition = @get 'handleDragStartPosition'
    sectionDragStartPosition = @get 'sectionDragStartPosition'
    dragStartPosition = handleDragStartPosition || sectionDragStartPosition
    dx = dragEndPosition.x - dragStartPosition.x
    dy = dragEndPosition.y - dragStartPosition.y

    sdImagingHelper = @get 'sdImagingHelper'
    dxLogical = sdImagingHelper.physicalToLogicalDistance dx
    dyLogical = sdImagingHelper.physicalToLogicalDistance dy

    newBounds = new OpenSeadragon.Rect(bounds.x, bounds.y, bounds.width, bounds.height)

    if handleDragStartPosition
      console.log handleDragStartPosition
      switch handleDragStartPosition.handle
        when 'tl'
          newBounds.x += dxLogical
          newBounds.y += dyLogical
        when 'tr'
          newBounds.y += dyLogical
        when 'bl'
          newBounds.x += dxLogical
      newBounds.width += dxLogical
      newBounds.height += dyLogical
    else
      newBounds.x += dxLogical
      newBounds.y += dyLogical

    @set 'handleDragStartPosition', undefined
    @set 'sectionDragStartPosition', undefined

    # send the section, the new logical bounds, and the new physical bounds
    @sendAction 'sectionMoved', section, newBounds, @get('sdViewport').viewportToImageRectangle(newBounds)

  # this is just debug code currently
  mouseMove: (e) ->
    viewport = @get 'sdViewport'
    return unless viewport

    offset = @$('.page-outer').offset()
    point = new OpenSeadragon.Point(e.pageX - offset.top, e.pageY - offset.left)
    converted = viewport.viewerElementToViewportCoordinates point
    @set 'mouseLogX', converted.x
    @set 'mouseLogY', converted.y

  didInsertElement: ->
    component = @

    Ember.run.scheduleOnce 'afterRender', @, =>
      sdViewer = new OpenSeadragon
        hash: @elementId
        element: @$().find('.page-outer')[0]
        tileSources: @get('dziUrl')
        showNavigationControl: false
        showNavigator: false
        defaultZoomLevel: 1
        minZoomLevel: 1
      imagingHelper = sdViewer.activateImagingHelper
        onImageViewChanged: (info) =>
          return if @isDestroying
          Em.run.debounce @, @timestampImage, 200
      sdViewer.addHandler 'canvas-drag', (info) =>
        component.sendAction 'sdBounds', sdViewer.viewport.getBounds()
      sdViewer.addHandler 'zoom', (info) =>
        component.sendAction 'sdZoom', info.zoom
        if sdViewer.viewport
          component.sendAction 'sdBounds', sdViewer.viewport.getBounds()

      sdViewer.addHandler 'open', (viewer, source) =>
        component.sendAction 'sdOpen', source
        @set 'sdViewport', @get('sdViewer').viewport

        @timestampImage()

      sdViewer.addHandler 'close', ->
        # close, @canvas.off events, etc.
        # @canvas.off('mouseenter.osdimaginghelper', @mouseEnter);
        # @canvas.off('mousemove.osdimaginghelper', @mouseMove);
        # @canvas.off('mouseleave.osdimaginghelper', @mouseLeave);

      @set 'sdViewer', sdViewer
      @set 'sdImagingHelper', imagingHelper

      window.sdViewer = sdViewer

  # An indicator that a new image was opened at a particular time, or that the
  # viewer has redrawn the image
  timestampImage: ->
    @set 'dziTimestamp', "#{@get('dziUrl')}#{new Date().getTime()}"

  setZoom: ( ->
      sdViewer.viewport.zoomTo @get('zoom')
    ).observes('zoom')

  _fitTo: ->
    bounds = @get 'bounds-rect'
    viewport = @get 'sdViewport'
    newBounds = new OpenSeadragon.Rect(bounds.x, bounds.y, bounds.width, bounds.height)
    console.log "centering on newBounds", newBounds
    viewport.fitBounds newBounds

  fitToBounds: ( ->
      bounds = @get 'bounds-rect'
      viewport = @get 'sdViewport'
      return unless bounds && viewport

      Em.run.debounce @, @_fitTo, 300
    ).observes('bounds-rect', 'sdViewport')

`export default Component`
