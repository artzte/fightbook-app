import Ember from "ember";

export default Ember.ObjectController.extend({
  needs: ['page'],
  adminEditLink: (function() {
    return FbAppENV.APP.keystonePath + ("/sections/" + (this.get('id')));
  }).property('content.id'),
  actions: {
    setActive: function() {
      this.content.get('page.sections').setEach('isActive', false);
      this.content.toggleProperty('isActive');
      return false;
    },
    getBounds: function() {
      this.set('bounds', this.get('controllers.page.sdBounds'));
      return false;
    },
    saveBounds: function() {
      var section;
      section = this.get('content');
      section.set('bounds', this.get('controllers.page.sdBounds'));
      section.save();
      return false;
    }
  }
});
