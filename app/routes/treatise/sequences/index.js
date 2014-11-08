import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var sequences = this.modelFor('treatise').get('sequences'),
        store = this.get('store');

    return new Ember.RSVP.Promise(function(resolve) {
      Ember.RSVP.all(sequences.map(function(sequence) {
            return store.reloadRecord(sequence);
          }))
        .then(function() {
          resolve(sequences);
        });
    }.bind(this));
  }
});
