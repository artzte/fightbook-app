import Ember from "ember";
import ajax from 'ic-ajax';

export default Ember.Controller.extend({
  actions: {
    signin: function() {
      var controller = this;
      return ajax({
        url: '/api/signin',
        method: 'post',
        data: {
          email: this.get('email'),
          password: this.get('password')
        }
      }).then(function(result) {
        var transition;
        controller.set('session.currentUser', Ember.Object.create(result));
        controller.set('session.isAnon', false);
        controller.set('errorResult', undefined);
        transition = controller.get('afterLoginTransition');
        if (transition) {
          controller.set('afterLoginTransition', null);
          transition.retry();
        } else {
          controller.transitionToRoute('treatises');
        }
      }, function(result) {
        Ember.run(function() {
          controller.set('errorResult', result.jqXHR.responseJSON);
        });
      });
    }
  }
});
