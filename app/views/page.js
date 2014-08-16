import Ember from "ember";
import PageRectangleSizingMixin from "../mixins/page-rectangle-sizing-mixin";
var run = Ember.run;

export default Ember.View.extend(PageRectangleSizingMixin, {
  setImageSizingRect: function() {
    run(function() {
        run.scheduleOnce('afterRender', this, function() {
          this.set('imageSizingRect',  {
            width: this.$('.page-image').width(),
            height: this.get('sizingRect.height')
          });
        });
      }.bind(this));
  }.observes('sizingRect.width', 'sizingRect.height')
});
