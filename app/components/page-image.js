import Ember from 'ember';

export default Ember.Component.extend({
  zoom: 1,
  classNames: ['page-image'],
  didReceiveAttrs: function(attrs) {

    const didChange = this.get('attrHelpers.didChange');

    // did dziUrl change? if so reload
    if (didChange(attrs, 'dziUrl')) {
      this.get('sdViewer').open(attrs.newAttrs.dziUrl.value);
      return;
    }

    // if the viewer dimensions are changing, update
    // we don't do this if we've just received the sizingRect for the
    // first time, out of band with other attributes
    if (didChange(attrs, 'sizingRect') && attrs.oldAttrs.sizingRect.value) {
      this.doResize();
      return;
    }

    // if the bounds rect changed, reset it
    if (didChange(attrs, 'boundsRect')) {
      this.doBoundsRect();
      return;
    }

    // zoom is the most minor change
    if (didChange(attrs, 'zoom')) {
      this.doZoom();
    }
  },

  notifyImageViewChanged: function() {
    this.sendAction('imageViewChanged');
  },

  didInsertElement: function() {

    const sdViewer = new OpenSeadragon({
      hash: this.elementId,
      element: this.$().find('.page-outer')[0],
      tileSources: this.get('dziUrl'),
      showNavigationControl: false,
      showNavigator: false,
      defaultZoomLevel: 1,
      minZoomLevel: 1,
      zoomPerClick: 1,
      zoomPerScroll: 1
    });

    const imagingHelper = sdViewer.activateImagingHelper({

      // sends an action that results in a timestamp change that
      // helps the image bounds and sections stay in sync through
      // zooming, etc.
      onImageViewChanged: function(/* info */) {
        if (this.isDestroying) {
          return;
        }

        // Lazily runs the timestamp
        Ember.run.debounce(this, this.notifyImageViewChanged, 200);
      }.bind(this)
    });

    // Tracks the zoom level so that page-based controls can increase or reduce the zoom
    sdViewer.addHandler('zoom', function(info) {
      this.sendAction('sdZoom', info.zoom);
    }.bind(this));

    sdViewer.addHandler('canvas-click', function(info) {
      this.sendAction('pageClick', this.sdViewport.pointFromPixel(info.position));
    }.bind(this));

    sdViewer.addHandler('open', (viewer, source) => {
      this.sendAction('sdOpen', source);
      this.set('sdViewport', this.get('sdViewer').viewport);

      Ember.run.scheduleOnce('afterRender', this, this.doResize);
    });

    sdViewer.addHandler('close', function() {
      Ember.Logger.debug("viewer closed");
    }.bind(this));

    this.set('sdViewer', sdViewer);
    this.set('sdImagingHelper', imagingHelper);

    // for debugging
    // window.sdViewer = sdViewer;
  },

  doZoom: function() {
    const sdViewport = this.get('sdViewer.viewport');
    const zoom = this.get('zoom');

    sdViewport.zoomTo(zoom);
  },

  doResize: function() {
    console.log('im resizig');
    const sizingRect = this.get('sizingRect');
    this.$('.page-outer').css({height: sizingRect.height, width: sizingRect.width});

    this.doBoundsRect();
  },

  doBoundsRect: function() {
    const sdViewport = this.get('sdViewer.viewport');
    const boundsRect = this.get('boundsRect');
    const newBounds = new OpenSeadragon.Rect(boundsRect.x, boundsRect.y, boundsRect.width, boundsRect.height);

    sdViewport.fitBounds(newBounds);
  },

  // The following are all editing-related.
  dragOver: function(ev) {
    ev.preventDefault();
  },

  drop: function(ev) {
    var newBounds, physical, section;

    section = this.get('sectionEdited');

    if (!this.get('sectionEdited')) {
      return;
    }

    newBounds = this.recalcSectionArea(section, ev.originalEvent.pageX, ev.originalEvent.pageY);

    this.set('handleDragStartPosition', undefined);
    this.set('sectionDragStartPosition', undefined);
    this.set('sectionEdited', undefined);

    physical = this.get('sdViewport').viewportToImageRectangle(newBounds);
    Ember.keys(physical).forEach(function(key) {
      physical[key] = Math.round(physical[key]);
    });

    this.sendAction('sectionMoved', section, newBounds, physical);

    return true;
  },

  diffPoint: function(startX, startY, endX, endY) {
    var sdImagingHelper = this.get('sdImagingHelper');
    return {
      dx: sdImagingHelper.physicalToLogicalDistance(endX - startX),
      dy: sdImagingHelper.physicalToLogicalDistance(endY - startY)
    };
  },

  recalcSectionArea: function(section, x, y) {
    var bounds, dragStartPosition, dxLogical, dyLogical, handleDragStartPosition, newBounds, sectionDragStartPosition, diff;

    bounds = section.get('osBounds');
    handleDragStartPosition = this.get('handleDragStartPosition');
    sectionDragStartPosition = this.get('sectionDragStartPosition');
    dragStartPosition = handleDragStartPosition || sectionDragStartPosition;

    diff = this.diffPoint(dragStartPosition.x, dragStartPosition.y, x, y);
    dxLogical = diff.dx;
    dyLogical = diff.dy;

    newBounds = new OpenSeadragon.Rect(bounds.x, bounds.y, bounds.width, bounds.height);

    if (handleDragStartPosition) {
      switch (handleDragStartPosition.handle) {
        case 'tl':
          newBounds.x += dxLogical;
          newBounds.y += dyLogical;
          newBounds.width -= dxLogical;
          newBounds.height -= dyLogical;
          break;
        case 'bl':
          newBounds.x += dxLogical;
          newBounds.width -= dxLogical;
          newBounds.height += dyLogical;
          break;
        case 'tr':
          newBounds.y += dyLogical;
          newBounds.width += dxLogical;
          newBounds.height -= dyLogical;
          break;
        case 'br':
          newBounds.width += dxLogical;
          newBounds.height += dyLogical;
          break;
      }
    } else {
      newBounds.x += dxLogical;
      newBounds.y += dyLogical;
    }
    return newBounds;
  },

  actions: {

    sectionDragStart: function(section, e) {
      this.sendAction('sectionDragStart', section, e);
      this.set('sectionEdited', section);
      this.set('sectionDragStartPosition', {
        x: e.originalEvent.pageX,
        y: e.originalEvent.pageY
      });
    },
    sectionSizeStart: function(section, handle, e) {
      this.sendAction('sectionSizeStart', section, handle, e);
      this.set('sectionEdited', section);
      this.set('handleDragStartPosition', {
        handle: handle,
        x: e.originalEvent.pageX,
        y: e.originalEvent.pageY
      });
    }
  },


});

