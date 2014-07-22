import BaseRoute from '../_base';

export default BaseRoute.extend({
  model: function() {
    return this.modelFor('treatises');
  },
  afterModel: function() {
    this.set('title', 'Treatises');
  }
});
