import BaseRoute from '../_base';

export default BaseRoute.extend({
  model: function() {
    return this.modelFor('page');
  },
  setupController: function(controller, page) {
    this.set('title', [page.get('treatise.title'), page.get('title')].join(' - '));
    controller.set('controllers.page.boundsRect', page.get('bounds'));
    this._super(controller, page);
  }
});
