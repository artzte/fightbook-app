import Ember from "ember";

export default Ember.Mixin.create({
  windowResized: function() {
    this.calcPageRectangle();
  },
  didInsertElement: function() {
    Ember.$(window).on('resize', this.windowResized.bind(this));

    this.calcPageRectangle();
  },
  calcPageRectangle: function() {
    var innerWrap = Ember.$('.inner-wrap'),
        el = this.$(),
        nav = Ember.$('nav.tab-bar'),
        header = Ember.$('header'),
        remainingHeight = innerWrap.height() - nav.height() - (header.height()||0);

    this.set('sizingRect', {
      width: el.width(),
      height: remainingHeight
    });
  },
  sizingRectStyle: function() {
    var rect = this.get('sizingRect');
    if(!rect) {
      return "";
    }

    return "height: "+rect.height+"px";
  }.property('sizingRect.width', 'sizingRect.height'),
  willDestroyElement: function() {
    Ember.$(window).off('resize', this.windowResized);
  }
});

