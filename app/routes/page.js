import BaseRoute from './_base';

var Route = BaseRoute.extend({
  model: function(params) {
    const treatise = this.modelFor('treatise');
    const page = treatise.get('pages').findBy('slug', params.slug);

    if (page.get('_detail')) {
      return page;
    }

    var promise = page.reload();
    promise.then(function(page) {
      page.set('_detail', true);
      return page;
    });
    return promise;
  },
  renderTemplate: function(controller, page) {
    this._super(...arguments);
    this.renderHeader({
      treatise: this.modelFor('treatise'),
      page: page,
      pages: this.controllerFor('treatise').get('pagesSorted'),
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
    },
    setSection: function(section) {
      console.log('got section', section);
      this.controller.set('section', section);
    },
    setBounds: function(bounds) {
      this.controller.set('boundsRect', bounds);
    },
  }
});

export default Route;
