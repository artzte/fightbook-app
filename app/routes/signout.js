import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  beforeModel: function() {
    ajax({
      url: '/api/signout'
    }).then(function() {
        this.transitionTo('/');
        this.set('session.isAnon', true);
        this.set('session.currentUser', null);
      }.bind(this)
    );
  }
});
