import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function() {
  this.route('signin');
  this.route('signout');
  this.route('treatises', {
    path: '/t',
    resetNamespace: true,
  }, function() {
    this.route('index', { path: '/' });
    this.route('treatise', {
      path: ':treatiseKey',
      resetNamespace: true,
    }, function() {
      this.route('sequences', { path: '/seq' }, function() {
        this.route('index', {path: '/'});
        this.route('sequence', {path: '/:sequenceSlug'});
      });

      this.route('page', {
        path: '/p/:pageId',
        resetNamespace: true,
      }, function() {
        this.route('section', { path: '/sec/:sort_order' });
      });
    });
  });
});

export default Router;
