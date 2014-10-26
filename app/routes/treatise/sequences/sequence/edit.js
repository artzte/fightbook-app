import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.modelFor('treatise.sequences.sequence');
  },
  setupController: function(controller, model) {
    this._super(controller, model);
  },
  actions: {
    willTransition: function(transition) {
      console.log("WILL", transition);
    },
    didTransition: function(transition) {
      console.log("DID", transition);
    }
  }
});
