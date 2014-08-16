import Ember from "ember";

export default Ember.Component.extend({
  classNames: ['section-area'],
  classNameBindings: ['selected', 'visible'],
  tagName: ['div'],
  attributeBindings: ['draggable'],
  draggable: "true",

  selected: (function() {
    if (this.get('current-section') === this.get('section')) {
      return 'selected';
    }
  }).property('current-section', 'section'),

  positionElement: (function() {
    var bounds = this.get('bounds'),
        overlay = this.$(),
        viewport = this.get('viewport');

    if (!(overlay && bounds && viewport)) {
      return;
    }

    function redraw() {
      var base, end;
      base = viewport.viewportToViewerElementCoordinates(new OpenSeadragon.Point(bounds.x, bounds.y));
      end = viewport.viewportToViewerElementCoordinates(new OpenSeadragon.Point(bounds.x + bounds.width, bounds.y + bounds.height));
      overlay.css({
        left: base.x,
        top: base.y,
        width: end.x - base.x,
        height: end.y - base.y
      });
    }
    Ember.run.debounce(this, redraw, 100);
  }).observes('bounds', 'viewport', 'zoom', 'sizing-rect'),

  dragStart: function(e) {
    var dragged = Ember.$(e.target);
    if (dragged.is('.handle')) {
      this.sendAction('sectionSizeStart', this.get('section'), dragged.data('handle'), e);
    } else {
      this.sendAction('sectionDragStart', this.get('section'), e);
    }
    e.dataTransfer.setData('text/data', this.get('section.id'));
  }
});

