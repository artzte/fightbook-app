import Ember from "ember";

export default Ember.Controller.extend({
  sortOrder: ['sortOrder'],
  pagesSorted: Ember.computed.sort('model.pages', 'sortOrder'),
});
