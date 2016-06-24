import Ember from "ember";

export default Ember.Controller.extend({
  needs: ['application', 'page/section', 'treatises', 'treatise'],
  zoomStops: [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 5],

  nextPage: (function() {
    var treatise;
    treatise = this.get('treatise');
    return this.get('treatise').nextPage(this.get('content'));
  }).property('content', 'treatise.isSettled', 'treatise.pages.@each'),

  prevPage: (function() {
    var treatise;
    treatise = this.get('treatise');
    return this.get('treatise').prevPage(this.get('content'));
  }).property('content', 'treatise.isSettled', 'treatise.pages.@each'),

  timestampImageChangedAt: function() {
    this.set('imageViewChangedAt', new Date().getTime());
  },

  actions: {
    imageViewChanged: function() {
      this.timestampImageChangedAt();
    },
    sectionMoved: function(section, newBounds, newPhysicalBounds) {
      section.set('bounds', newBounds);
      section.set('physicalBounds', newPhysicalBounds);
      this.get('updateQueue').addTask(section);
      return false;
    },
    sdZoom: function(zoom) {
      this.set('sdZoom', zoom);
      this.timestampImageChangedAt();
      return false;
    },
    zoomIn: function() {
      var larger, newZoom, sdZoom;
      sdZoom = this.get('sdZoom');
      larger = this.zoomStops.filter(function(item) {
        return item > sdZoom;
      });
      newZoom = larger.get('firstObject');
      if (newZoom != null) {
        this.set('zoom', newZoom);
      }
      return false;
    },
    zoomOut: function() {
      var newZoom, sdZoom, smaller;
      sdZoom = this.get('sdZoom');
      smaller = this.zoomStops.filter(function(item) {
        return item < sdZoom;
      });
      newZoom = smaller.get('lastObject');
      if (newZoom != null) {
        this.set('zoom', newZoom);
      }
      return false;
    }
  }
});
