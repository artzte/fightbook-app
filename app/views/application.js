export default Ember.View.extend({
  classNames: ['application-wrapper'],
  didInsertElement: function() {
    var view = this;

    // Initial vertical sizing of page elements
    Ember.run.scheduleOnce('afterRender', view, function() {
      return view.doResize();
    });

    // Fix the vertical height of page elements on resize
    window.onresize = function() {
      Ember.run(view, function() {
        Ember.run.debounce(view, view.doResize, 200);
      });

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
    };
  }
});
