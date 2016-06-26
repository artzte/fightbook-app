import Ember from "ember";
import BaseRoute from './_base';
import config from '../config/environment';


var Route = BaseRoute.extend({
  ajax: Ember.inject.service(),

  // resolves as the current user if authenticated; otherwise returns
  // a blank object
  model: function() {
    const mePath = '/api/me';
    const ajax = this.get('ajax');

    return new Ember.RSVP.Promise((resolve, reject) => {
        ajax.request(mePath).then((result) => {
          var user = Ember.Object.create(result);
          if (result.isAnon) {
            this.set('session.isAnon', true);
            this.set('session.currentUser', null);
          } else {
            this.set('session.isAnon', false);
            this.set('session.currentUser', user);

            // Now post to mePath to bump the visit status
            ajax.request(mePath, {
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
  setupController: function() {
    var updateQueue = this.get('updateQueue');
    if (!updateQueue.get('content')) {
      updateQueue.set('content', []);
    }
    this._super.apply(this, arguments);
  },
  renderTemplate: function() {
    this._super.apply(this, arguments);
    this.render('components/layout/header', {
      into: 'application',
      outlet: 'header',
    });
  },
  clearSession: function() {
    this.set('session.currentUser', undefined);
    this.set('session.isAnon', true);
    this.set('settings.editMode', false);
  },
  actions: {
    setTitle: function() {
      var args = Ember.$.makeArray(arguments),
        title;

      args.unshift(config.APP.title);
      title = args.join(' : ');
      this.controller.set('pageTitle', title);
      Ember.$('title').text(title);

    },
    saveItem: function(item) {
      if(item && item.get('isDirty')) {
        item.save();
      }
    },
    confirmDelete: function(item) {
      if(confirm(['Remove ',item.get('title'),'?'].join(''))) {
        item.deleteRecord();
        item.save();
      }
    },
    toggleEditMode: function(mode) {
      if(arguments.length) {
        this.set('settings.editMode', mode);
      }
      else {
        this.toggleProperty('settings.editMode');
      }
      this.send('flushUpdateQueue');
      return true;
    },

    willTransition: function() {
      this.set('settings.mainContainerClass', null);
    },

    // goes through the queued updates and submits them all in sequence
    flushUpdateQueue: function() {
      var item, updateQueue, i, len;
      if (!this.get('session.currentUser.isAdmin')) {
        return;
      }
      updateQueue = this.get('updateQueue');

      for(i = 0, len = updateQueue.get('length'); i < len; i++) {
        item = updateQueue.shiftObject();
        if(item.get('isDirty')) {
          item.save();
        }
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


