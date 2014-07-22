import ajax from 'ic-ajax';
var Route = Ember.Route.extend({
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

export default Route;
