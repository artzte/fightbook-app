import Ember from "ember";

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),
  actions: {
    signin: function() {
      return this.get('ajax').request('/api/signin', {
        method: 'post',
        data: {
          email: this.get('email'),
          password: this.get('password')
        }
      }).then((result) => {
        const transition = this.get('afterLoginTransition');

        this.set('session.currentUser', Ember.Object.create(result));
        this.set('session.isAnon', false);
        this.set('errorResult', undefined);

        if (transition) {
          this.set('afterLoginTransition', null);
          transition.retry();
        } else {
          this.transitionToRoute('treatises');
        }
      }, (result) => {
        Ember.run(() => {
          let msg;
          try {
            msg = result.errors[0].detail.message;
          } catch(e) {
            msg = 'Could not match username or password';
          }
          this.set('errorResult', msg);
        });
      });
    }
  }
});
