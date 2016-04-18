import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['sliding-panel-fade-screen'],
  classNameBindings: ['visible:sliding-panel-fade-screen-visible'],
  doClick: function() {
    const onClick = this.get('onClick');
    if (onClick) {
      onClick();
    }
  },
  click: function() {
    this.doClick();
  },
  touchstart: function() {
    this.doClick();
  },
});
