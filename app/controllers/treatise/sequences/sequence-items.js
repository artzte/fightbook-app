import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['page.sortOrder', 'section.sortOrder'],
    actions: {
      confirmDelete: function(sequenceItem) {
        if(confirm(['Remove ',sequenceItem.get('title'),'?'].join(''))) {
          Ember.run.schedule('actions', this, function() {
            sequenceItem.deleteRecord();
            sequenceItem.save();
          });
        }
      }
    }
});
