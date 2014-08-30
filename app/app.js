import Ember from 'ember';
import Resolver from 'ember/resolver';
import DS from "ember-data";
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'fb-app',   //  TODO: loaded via config
  Resolver: Resolver,
  ready: function() {
    // init the foundation JS
    Ember.$(document).foundation();
  }
});

DS.RESTAdapter.reopen({
  namespace: 'api'
});

Ember.Application.initializer({
  name: 'appInitializers',
  initialize: function(container, app) {
    // Register a session object for routes and controllers
    app.Session = Ember.Object.extend();
    app.register('session:current', app.Session, {
      singleton: true
    });
    app.inject('controller', 'session', 'session:current');
    app.inject('route', 'session', 'session:current');

    // Register a settings object for routes and controllers
    app.Settings = Ember.Object.extend();
    app.register('settings:current', app.Settings, {
      singleton: true
    });
    app.inject('controller', 'settings', 'settings:current');
    app.inject('route', 'settings', 'settings:current');

    // Register the update queue, which holds page updates
    app.register('updateQueue:current', Ember.ArrayProxy, {
      singleton: true
    });
    app.inject('controller', 'updateQueue', 'updateQueue:current');
    app.inject('route', 'updateQueue', 'updateQueue:current');
  }
});

App.responsive({
  media: {
    medium: "(min-width: 40.063em)",
    small: "(max-width: 40em)"
  }
});

loadInitializers(App, 'fb-app');

DS.RESTSerializer.reopen({
  primaryKey: '_id'
});

export default App;
