Component = Ember.Component.extend
  classNames: ['page-image']

  updateSource: (->
      @get('sdViewer').open @get 'dziUrl'
    ).observes('dziUrl')

  actions:
    # proxy the drag start through to the container view and record the start position
    sectionDragStart: (section, e) ->
      @sendAction 'sectionDragStart', section, e
      @set 'sectionEdited', section
      @set 'sectionDragStartPosition',
        x: e.originalEvent.pageX
        y: e.originalEvent.pageY

    sectionSizeStart: (section, handle, e) ->
      @sendAction 'sectionSizeStart', section, handle, e
      @set 'sectionEdited', section
      @set 'handleDragStartPosition',
        handle: handle
        x: e.originalEvent.pageX
        y: e.originalEvent.pageY
  dragOver: (ev) ->
    ev.preventDefault()

  # surfaces a section-moved message when the section rectangle is moved or sized
  drop: (ev) ->
    section = @get 'sectionEdited'
    return unless @get 'sectionEdited'

    newBounds = @recalcSectionArea section, ev.originalEvent.pageX, ev.originalEvent.pageY

    @set 'handleDragStartPosition', undefined
    @set 'sectionDragStartPosition', undefined
    @set 'sectionEdited', undefined

    # send the section, the new logical bounds, and the new physical bounds
    physical = @get('sdViewport').viewportToImageRectangle(newBounds)
    Em.keys(physical).forEach (key) ->
      physical[key] = Math.round(physical[key])
    @sendAction 'sectionMoved', section, newBounds, physical

  # converts the distance moved to a logical distance. The returned values are end minus start
  diffPoint: (startX, startY, endX, endY) ->
    sdImagingHelper = @get 'sdImagingHelper'

    dx = endX - startX
    dy = endY - startY

    [sdImagingHelper.physicalToLogicalDistance(dx), sdImagingHelper.physicalToLogicalDistance(dy)]

  recalcSectionArea: (section, x, y) ->
    bounds = section.get 'bounds'

    handleDragStartPosition = @get 'handleDragStartPosition'
    sectionDragStartPosition = @get 'sectionDragStartPosition'
    dragStartPosition = handleDragStartPosition || sectionDragStartPosition

    [dxLogical, dyLogical] = @diffPoint(dragStartPosition.x, dragStartPosition.y, x, y)

    newBounds = new OpenSeadragon.Rect(bounds.x, bounds.y, bounds.width, bounds.height)

    if handleDragStartPosition
      switch handleDragStartPosition.handle
        when 'tl'
          newBounds.x += dxLogical
          newBounds.y += dyLogical
          newBounds.width -= dxLogical
          newBounds.height -= dyLogical

        when 'bl'
          newBounds.x += dxLogical
          newBounds.width -= dxLogical
          newBounds.height += dyLogical

        when 'tr'
          newBounds.y += dyLogical
          newBounds.width += dxLogical
          newBounds.height -= dyLogical

        when 'br'
          newBounds.width += dxLogical
          newBounds.height += dyLogical
    else
      newBounds.x += dxLogical
      newBounds.y += dyLogical

    newBounds

  didInsertElement: ->
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
        @sendAction 'sdBounds', sdViewer.viewport.getBounds()
      sdViewer.addHandler 'zoom', (info) =>
        @sendAction 'sdZoom', info.zoom
        if sdViewer.viewport
          @sendAction 'sdBounds', sdViewer.viewport.getBounds()
      sdViewer.addHandler 'open', (viewer, source) =>
        @sendAction 'sdOpen', source
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
    viewport.fitBounds newBounds

  fitToBounds: ( ->
      bounds = @get 'bounds-rect'
      viewport = @get 'sdViewport'
      return unless bounds && viewport

      Em.run.debounce @, @_fitTo, 300
    ).observes('bounds-rect', 'sdViewport')

`export default Component`
