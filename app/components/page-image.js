import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['page-image'],
  didReceiveAttrs: function(attrs) {
    console.log(attrs);
    console.log(arguments);

    // boundsRect: the area of the image content to zoom to
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

  updateSource: (function() {
    this.get('sdViewer').open(this.get('dziUrl'));
  }).observes('dziUrl'),

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

    sdViewer.addHandler('open', function(viewer, source) {
      this.sendAction('sdOpen', source);
      this.set('sdViewport', this.get('sdViewer').viewport);
    }.bind(this));

    sdViewer.addHandler('close', function() {
      Ember.Logger.debug("viewer closed");
    }.bind(this));

    this.set('sdViewer', sdViewer);
    this.set('sdImagingHelper', imagingHelper);

    Ember.run.scheduleOnce('afterRender', this, function() {
      this.sizeTo();
    });

    // for debugging
    // window.sdViewer = sdViewer;
  },

  setZoom: (function() {
    this.sdViewer.viewport.zoomTo(this.get('zoom'));
  }).observes('zoom'),

  resizeContainer: function() {
    this.sizeTo();
    this.fitToBounds();
  }.observes('sizingRect.width', 'sizingRect.height'),

  sizeTo: function() {
    var rect = this.get('sizingRect');
    if(!rect) {
      return;
    }

    this.$('.page-outer').css({height: rect.height, width: rect.width});
  },

  _fitTo: function() {
    const bounds = this.get('boundsRect');
    const viewport = this.get('sdViewport');
    const newBounds = new OpenSeadragon.Rect(bounds.x, bounds.y, bounds.width, bounds.height);

    return viewport.fitBounds(newBounds);
  },

  fitTo: function() {
    Ember.run.debounce(this, this._fitTo, 300);
  },

  fitToBounds: function() {
    this.fitTo();
  }.observes('boundsRect', 'sdViewport')
});

