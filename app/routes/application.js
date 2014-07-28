import Ember from "ember";
import BaseRoute from './_base';
import ajax from 'ic-ajax';

var Route = BaseRoute.extend({
  // resolves as the current user if authenticated; otherwise returns 
  // a blank object
  model: function() {
    var mePath = '/api/me';
    var route = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
        ajax({
          url: mePath,
          dataType: 'json'
        }).then(function(result) {
          var user = Ember.Object.create(result);
          if (result.isAnon) {
            route.set('session.isAnon', true);
            route.set('session.currentUser', null);
          } else {
            route.set('session.isAnon', false);
            route.set('session.currentUser', user);

            // Now post to mePath to bump the visit status
            ajax({
              url: mePath,
              method: 'post'
            });
          }
          resolve(user);
        }, function(result) {
          reject(result);
        });
      }
    );
  },
  clearSession: function() {
    this.set('session.currentUser', undefined);
    this.set('session.isAnon', true);
    this.set('settings.editMode', false);
  },
  actions: {
    toggleEditMode: function() {
      this.toggleProperty('settings.editMode');
      this.send('flushUpdateQueue');
      return true;
    },

    // goes through the queued updates and submits them all in sequence
    flushUpdateQueue: function() {
      var section, updateQueue;
      if (!this.get('session.currentUser.isAdmin')) {
        return;
      }
      updateQueue = this.get('updateQueue');
      while (updateQueue.get('length')) {
        section = updateQueue.popObject();
        section.save();
      }
      return true;
    },
    // TODO 404 conditions
    error: function(result /*, transition */) {
      if (result.status === 403) {
        this.clearSession();
        this.transitionTo('signout');
        return false;
      } else {
        return true;
      }
    }
  }
});

export default Route;


