import BaseRoute from '../_base';

export default BaseRoute.extend({
  model: function() {
    return this.modelFor('page');
  },
  setupController: function(controller, page) {
    this.set('title', [page.get('treatise.title'), page.get('title')].join(' - '));
    controller.set('controllers.page.boundsRect', page.get('bounds'));
    this._super(controller, page);
  },
  actions: {
    // Hooks the page click event to navigate to the clicked section image
    pageClick: function(logicalPoint) {
      var sections = this.modelFor('page').get('sections'),
          x = logicalPoint.x,
          y = logicalPoint.y,
          section = sections.find(function(section) {
            var bounds = section.get('osBounds');
            return (x >= bounds.x && x < bounds.x + bounds.width) &&
                (y >= bounds.y && y < bounds.y + bounds.height);
          });

      if(section) {
        this.transitionTo('page.section', section.get('page'), section.get('sortOrder'));
      }
      return false;
    }
  }
});
