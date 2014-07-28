import Ember from "ember";
import BaseRoute from './_base';

export default BaseRoute.extend({
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
