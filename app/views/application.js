import Ember from "ember";

export default Ember.View.extend({
  classNames: ['application-wrapper'],
  didInsertElement: function() {
    var view = this;

    // This blocks page unload until the update queue can be flushed. In
    // most cases even if the user clicks ok to continue refresh they will
    // get pushed.
    window.onbeforeunload = function() {
      var controller = view.get('controller');
      if (controller.get('updateQueue.length')) {
        controller.send('flushUpdateQueue');
        return "Are you sure you want to navigate away before saving your changes?";
      }
    };
  }
});
