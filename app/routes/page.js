import BaseRoute from './_base';

var Route = BaseRoute.extend({
  model: function(params) {
    var page, store, treatise;
    store = this.get('store');
    treatise = this.modelFor('treatise');
    page = treatise.get('pages').findProperty('slug', params.pageId);

    if (page.get('_detail')) {
      return page;
    }
    else {
      var promise = page.reload();
      promise.then(function(page) {
        page.set('_detail', true);
      });
      return promise;
    }
  },
  setupController: function(controller, model) {
    this._super.apply(this, arguments);
    controller.set('page', model);
  },
  renderTemplate: function() {
    this._super();
    this.render('page/nav', {
      into: 'treatise',
      outlet: 'treatiseNav',
      controller: this.controller
    });
  },
  actions: {
    sectionClicked: function(section) {
      this.transitionTo('page.section', this.get('currentModel'), section.get('sortOrder'));
    },
    didTransition: function() {
      this.send('setTitle', this.modelFor('treatise').get('title'), this.modelFor('page').get('title'));
    },
    willTransition: function() {
      this.send('flushUpdateQueue');
    }
  }
});

export default Route;
