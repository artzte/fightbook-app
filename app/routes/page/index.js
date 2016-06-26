import BaseRoute from '../_base';

export default BaseRoute.extend({
  model: function() {
    return this.modelFor('page');
  },
  renderTemplate: function(controller, page) {
    this._super.apply(this, arguments);
    this.send('setBounds', page.get('bounds'));
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
