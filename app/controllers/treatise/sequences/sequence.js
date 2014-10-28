import Ember from 'ember';

export default Ember.ObjectController.extend({
  sequenceItemsPageOrdered: function() {
    var items = this.get('sequenceItems');
    return Ember.ArrayController.create({
      content: items,
      sortProperties: ['page.sortOrder', 'section.sortOrder']
    });
  }.property('sequenceItems.isLoaded')
});
