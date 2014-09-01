import Ember from "ember";
import PageRectangleSizingMixin from "../mixins/page-rectangle-sizing-mixin";

export default Ember.View.extend(PageRectangleSizingMixin, {
  setSizingRects: function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      this.set('imageSizingRect',  {
        width: this.$('.page-image').width(),
        height: this.get('sizingRect.height')
      });
      if(this.get('media.isSmall')) {
        this.set('sizeContentStyle', '');
      }
      else {
        this.set('sizeContentStyle', this.get('sizingRectStyle'));
      }
    });
  }.observes('sizingRect.width', 'sizingRect.height')
});
