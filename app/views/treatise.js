export default Em.View.extend({
  didInsertElement: function() {
    Em.run.scheduleOnce('afterRender', this, function() {
        return this.doResize();
      });
  }
});

