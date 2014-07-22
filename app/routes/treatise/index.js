import BaseRoute from '../_base';

export default BaseRoute.extend({
  model: function() {
    return this.modelFor('treatise');
  },
  afterModel: function() {
    this.set('title', this.get('context.title'));
  }
});

