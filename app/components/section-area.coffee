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
      imagingHelper = @get 'sd-imaging-helper'
      viewer = @get 'viewer'
      ts = @get 'dzi-timestamp'
      overlay = @$()

      return unless overlay && bounds && imagingHelper && viewer && @get('dzi-timestamp')

      redraw = ->
        # Adjusts the bounds element so that it matches the new image
        point = imagingHelper.logicalToPhysicalPoint
          x: bounds.x
          y: bounds.y
        width = Math.floor imagingHelper.logicalToPhysicalDistance(bounds.width)
        height = Math.floor imagingHelper.logicalToPhysicalDistance(bounds.height)
        overlay.css
          left: point.x
          top: point.y
          width: width
          height: height
        
        viewer.updateOverlay overlay[0], point

      Em.run.debounce @, redraw, 500

    ).observes('bounds', 'sd-imaging-helper', 'viewer', 'dzi-timestamp', 'zoom')

  getClientOffset: (e) ->
    target = e.target || e.srcElement
    rect = target.getBoundingClientRect()
    [e.clientX - rect.left, e.clientY - rect.top]

  dragStart: (e) ->
    e.dataTransfer.setData('text/data', @get('section.id'))
    @sendAction 'sectionDragStart', @get('section'), e

`export default Component`