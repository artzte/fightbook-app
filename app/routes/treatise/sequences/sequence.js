import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var sequence = this.modelFor('treatise').get('sequences').findProperty('slug', params.sequenceSlug),
        store = this.store;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (Ember.isNone(sequence.get('hasLoadedItems'))) {
        return store.reloadRecord(sequence).then(
          function() {
            sequence.set('hasLoadedItems', true);
            resolve(sequence);
          },
          function(err) {
            reject(err);
          }
        );
      } else {
        return resolve(sequence);
      }
    });
  }
});
