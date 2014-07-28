import Ember from "ember";

export default Ember.View.extend({
  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      this.$(window).trigger('resize');
    });
  }
});
