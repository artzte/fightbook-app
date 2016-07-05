import Ember from "ember";

export default Ember.Route.extend({
  makeController(init) {
    return Ember.Object.create(init);
  },
  renderHeader(controllerObj = {}) {
    this.render('components/layout/header', {
      into: 'application',
      outlet: 'header',
      controller: this.makeController(controllerObj),
    });
  },
});
