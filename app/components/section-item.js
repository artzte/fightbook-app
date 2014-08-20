import Ember from "ember";

export default Ember.Component.extend({
  classNameBindings: 'isActive',
  tagName: 'li',

  isActive: (function() {
    if (this.get('section') === this.get('current-section')) {
      return 'active';
    }
  }).property('section', 'current-section'),

  iconClass: (function() {
    switch (this.get('section.sortOrder')) {
      case 1:
        return 'icon-top-left';
      case 2:
        return 'icon-top-right';
      case 3:
        return 'icon-bottom-left';
      case 4:
        return 'icon-bottom-right';
      default:
        return 'icon-bottom-right';
    }
  }).property('section.sortOrder'),

  actions: {
    select: function() {
      if (this.get('isActive')) {
        this.sendAction('setBounds', this.get('section.bounds'));
      } else {
        this.$('a:first-child').click();
      }
    }
  }
});
