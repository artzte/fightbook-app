import Ember from "ember";

export default Ember.Controller.extend({
  mainContainerClass: Ember.computed.alias('settings.mainContainerClass')
});
