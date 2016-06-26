import Ember from "ember";

export default Ember.Route.extend({
  makeController: (init) => Ember.Object.create(init),
});
