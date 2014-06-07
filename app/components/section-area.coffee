Component = Ember.Component.extend
  classNames: ['section-area']
  classNameBindings: ['selected']
  tagName: ['div']
  attributeBindings: ['draggable']
  draggable: "true"
  selected: (->
      'selected' if @get('current-section') == @get('section')
    ).property('current-section', 'section')

  positionElement: (->
      bounds = @get 'bounds'
      viewport = @get 'viewport'
      ts = @get 'dzi-timestamp'
      overlay = @$()

      return unless overlay && bounds && viewport && ts

      redraw = ->
        base = viewport.viewportToViewerElementCoordinates new OpenSeadragon.Point(bounds.x, bounds.y)
        end = viewport.viewportToViewerElementCoordinates new OpenSeadragon.Point(bounds.x+bounds.width, bounds.y+bounds.height)
        overlay.css
          left: base.x
          top: base.y
          width: end.x - base.x
          height: end.y - base.y

      Em.run.debounce @, redraw, 100
    ).observes('bounds', 'viewport', 'dzi-timestamp', 'zoom')

  getClientOffset: (e) ->
    target = e.target || e.srcElement
    rect = target.getBoundingClientRect()
    [e.clientX - rect.left, e.clientY - rect.top]

  dragStart: (e) ->
    dragged = $(e.target)
    if dragged.is('.handle')
      @sendAction 'sectionSizeStart', @get('section'), dragged.data('handle'), e
    else
      @sendAction 'sectionDragStart', @get('section'), e

    e.dataTransfer.setData('text/data', @get('section.id'))

`export default Component`
