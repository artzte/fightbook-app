import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.modelFor('treatise');
  },
  actions: {
    didTransition: function() {
      this.set('settings.mainContainerClass', 'main-section-scrollable');
    }
  }
});
