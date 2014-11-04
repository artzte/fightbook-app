import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['page.sortOrder', 'section.sortOrder'],
});
