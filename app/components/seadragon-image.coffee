Component = Ember.Component.extend
  classNames: ['seadragon-image']

  updateSource: (->
      @viewer.open @get 'dziUrl'
    ).observes('dziUrl')

  didInsertElement: ->
    component = @
    Ember.run.scheduleOnce 'afterRender', =>
      @viewer = new OpenSeadragon
        hash: @elementId
        element: @$().find('.dz-outer')[0]
        tileSources: @get('dziUrl')
        showNavigationControl: false
        showNavigator: false
        defaultZoomLevel: 1
        minZoomLevel: 1
        autoResize: true # can disable the resize on viewer resize
        
      @viewer.addHandler 'canvas-drag', (info) =>
        component.sendAction 'sdBounds', @viewer.viewport.getBounds()
      @viewer.addHandler 'zoom', (info) =>
        component.sendAction 'sdZoom', info.zoom
        if @viewer.viewport 
          component.sendAction 'sdBounds', @viewer.viewport.getBounds()
      @viewer.addHandler 'open', (viewer, source) =>
        component.sendAction 'sdOpen', source
        @fitBounds()
      window.sdViewer = @viewer
        
  setZoom: ( ->
      @viewer.viewport.zoomTo @get('zoom')
    ).observes('zoom')

  fitBounds: ->
    bounds = @get('bounds')
    # if no bounds are available (i.e., page), horizontally center it
    if bounds
      @viewer.viewport.fitBounds bounds
    else
      @viewer.viewport.fitHorizontally()

  setBounds: ( ->
      @fitBounds()
    ).observes('bounds', 'viewer.viewport')

`export default Component`