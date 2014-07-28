import Ember from "ember";

export default Ember.Controller.extend({
  setPageClass: function(cls) {
    return this.set('pageClass', cls);
  }
});


