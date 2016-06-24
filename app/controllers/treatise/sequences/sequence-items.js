import Ember from 'ember';

export default Ember.Controller.extend({
  sortedSequenceItems: Ember.computed.sort('model', ['page.sortOrder', 'section.sortOrder']),
});
