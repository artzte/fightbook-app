import Ember from "ember";
import BaseRoute from './_base';

var Route = BaseRoute.extend({
  model: function(params) {
    var page, store, treatise;
    store = this.get('store');
    treatise = this.modelFor('treatise');
    page = treatise.get('pages').findProperty('slug', params.pageId);

    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (Ember.isEmpty(page.get('sections'))) {
        return store.reloadRecord(page).then(
          function() {
            resolve(page);
          },
          function(err) {
            reject(err);
          }
        );
      } else {
        return resolve(page);
      }
    });
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('page', model);
  },
  renderTemplate: function() {
    this._super();
    return this.render('page/menu', {
      into: 'application',
      outlet: 'leftMenu',
      controller: this.get('controller')
    });
  },
  actions: {
    sectionClicked: function(section) {
      this.transitionTo('page.section', this.get('currentModel'), section.get('sortOrder'));
    },
    willTransition: function() {
      this.send('flushUpdateQueue');
    }
  }
});

export default Route;
