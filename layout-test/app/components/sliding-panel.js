import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  classNames: ['sliding-panel'],
  classNameBindings: ['expanded:sliding-panel-expanded'],
  mouseEnter: function() {
    this.get('expand')();
  },
  mouseLeave: function() {
    this.get('contract')();
  },
  click: function() {
    this.get('contract')();
  },
});

