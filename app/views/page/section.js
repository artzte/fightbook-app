import Ember from "ember";

export default Ember.View.extend({
  setScroll: function() {
    Ember.$('.section-column').scrollTop(0);
  }.observes('controller.content')
});
