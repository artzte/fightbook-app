import BaseRoute from './_base';
var Route = BaseRoute.extend({
  title: 'Sign in',
  beforeModel: function() {
    if (!this.get('session.isAnon')) {
      this.transitionTo('treatises');
    }
  },
  model: function() {
    return Ember.Object.create();
  }
});

export default Route;
