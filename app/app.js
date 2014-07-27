import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

Ember.Application.reopenClass({
  // This method sizes elements that are required to be of a certain height.
  doResize: function() {
    var $innerWrap = $('.inner-wrap'),
        headerHeight = $('nav').height() + $('header').height(),
        height = $innerWrap.height() - headerHeight;

    // get height-targeted containers - those with a sizeWhen data attribute
    // are conditionally sized based on responsive media query. if the query
    // does not match it removes the forced height attribute
    $('.size-to-height').each(function(index, container) {
        var el = $(container),
            sizeWhen = el.data('sizeWhen');
        if ((sizeWhen == null) || this.get("media." + sizeWhen)) {
          el.height(height);
        } else {
          el.css('height', '');
        }
      }.bind(this));
  }
});

var App = Ember.Application.extend({
  modulePrefix: 'fb-app',   //  TODO: loaded via config
  Resolver: Resolver,
  customEvents: ['resize'],
  ready: function() {
    // init the foundation JS
    $(document).foundation();
  }
});

Ember.Application.initializer({
  name: 'appInitializers',
  initialize: function(container, app) {
    // Make the resize method available in views
    app.register('doResizeInitializer:doResize', app.constructor.doResize, {
      instantiate: false
    });
    app.inject('view', 'doResize', 'doResizeInitializer:doResize');
    app.Session = Ember.Object.extend();

    // Register a session object for routes and controllers
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
