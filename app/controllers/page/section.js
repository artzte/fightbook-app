import Ember from "ember";
import config from '../../config/environment';

export default Ember.Controller.extend({
  needs: ['page'],
  adminEditLink: (function() {
    return config.APP.keystonePath + ("/sections/" + (this.get('id')));
  }).property('content.id'),
  actions: {
    setActive: function() {
      this.content.get('page.sections').setEach('isActive', false);
      this.content.toggleProperty('isActive');
      return false;
    }
  }
});
