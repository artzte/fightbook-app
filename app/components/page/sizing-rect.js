import Ember from "ember";

// sets onto the context,
//
// sizingRect - width: containerWidth, height: availableHeight
// imageSizingRect - width: $('.page-image').width, height: availableHeight
// sizeContentStyle - 'height: ${availableHeight}px'
// sizingRectStyle - blank if small, otherwise sizeContentStyle

export default Ember.Component.extend({
  debounceInterval: 300,

  didInsertElement: function() {
    Ember.$(window).on('resize', this.calcPageRectangle.bind(this));

    this._calcPageRectangle();
  },

  willDestroyElement: function() {
    Ember.$(window).off('resize', this.calcPageRectangle.bind(this));
  },

  calcPageRectangle: function() {
    Ember.run.debounce(this, this._calcPageRectangle, this.get('debounceInterval'));
  },

  _calcPageRectangle: function() {
    const el = this.$();
    const header = Ember.$('header.top-nav');
    const remainingHeight = window.innerHeight - header.height();

    const sizingRect = {
      width: el.width(),
      height: remainingHeight
    };

    this.set('sizingRect', sizingRect);

    function computeImageSizingRect() {
      const sizingRect = this.get('sizingRect');
      const sizingRectStyle = `height: ${sizingRect.height}px`;

      this.set('sizingRectStyle', sizingRectStyle);

      this.set('imageSizingRect',  {
        width: this.$('.page-image').width(),
        height: sizingRect.height,
      });

      if(this.get('media.isSmall')) {
        this.set('sizeContentStyle', '');
      }
      else {
        this.set('sizeContentStyle', sizingRectStyle);
      }
    }

    Ember.run.scheduleOnce('afterRender', this, computeImageSizingRect);
  },
});
