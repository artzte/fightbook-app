import BaseRoute from '../_base';

export default BaseRoute.extend({
  model: function(params) {
    var page = this.modelFor('page');
    
    return page.get('sections').findProperty('sortOrder', parseInt(params.sort_order, 10));
  },
  setupController: function(controller, section) {
    var page = this.modelFor('page');
    this._super(controller, section);

    this.set('title', [page.get('treatise.title'), page.get('title'), "Section " + (section.get('sortOrder'))].join(' - '));

    controller.set('page', page);
    controller.set('section', section);
    controller.set('controllers.page.section', section);
    controller.set('controllers.page.boundsRect', section.get('bounds'));

  }
});
