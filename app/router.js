/* global FbENV */
import Ember from 'ember';
var Router;

Router = Ember.Router.extend({
  location: FbENV.locationType
});

Router.map(function() {
  this.route('signin');
  this.route('signout');
  this.resource('treatises', { path: '/t' }, function() {
    this.route('index', { path: '/' });
    this.resource('treatise', { path: ':treatise_key' }, function() {
      this.resource('page', { path: '/:page_id' }, function() {
        this.route('section', { path: '/sec/:sort_order' });
      });
    });
  });
});

export default Router;
