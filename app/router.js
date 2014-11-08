import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('signin');
  this.route('signout');
  this.resource('treatises', { path: '/t' }, function() {
    this.route('index', { path: '/' });
    this.resource('treatise', { path: ':treatiseKey' }, function() {
      this.route('sequences', { path: '/seq' }, function() {
        this.route('index', {path: '/'});
        this.route('sequence', {path: '/:sequenceSlug'});
      });
      this.resource('page', { path: '/p/:pageId' }, function() {
        this.route('section', { path: '/sec/:sort_order' });
      });
    });
  });
});

export default Router;
