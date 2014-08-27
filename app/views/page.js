import Ember from "ember";
import PageRectangleSizingMixin from "../mixins/page-rectangle-sizing-mixin";

export default Ember.View.extend(PageRectangleSizingMixin, {
  setImageSizingRect: function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      this.set('imageSizingRect',  {
        width: this.$('.page-image').width(),
        height: this.get('sizingRect.height')
      });
    });
  }.observes('sizingRect.width', 'sizingRect.height'),
  setTextSizingRect: function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      var style;
      if(this.get('media.isSmall')) {
        style = '';
      }
      else {
        style = this.get('sizingRectStyle');
      }
      console.log('style is', style, this.get('media.isSmall'));
      this.set('sizeContentStyle', style);
    });
  }.observes('sizingRectStyle', 'media.isSmall')
});
