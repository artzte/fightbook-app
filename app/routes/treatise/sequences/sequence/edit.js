import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.modelFor('treatise.sequences.sequence');
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.send('toggleEditMode', true);
  }
});
