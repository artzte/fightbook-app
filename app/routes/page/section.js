import BaseRoute from '../_base';

export default BaseRoute.extend({
  model: function(params) {
    var page = this.modelFor('page');

    return page.get('sections').findProperty('sortOrder', parseInt(params.sort_order, 10));
  },
  setupController: function(controller, section) {
    var page = this.modelFor('page');
    this._super(controller, section);

    this.set('title', [page.get('treatise.title'), page.get('title'), "Section " + (section.get('sortOrder'))].join(' - '));

    controller.set('page', page);
    controller.set('section', section);
    controller.set('controllers.page.section', section);
    controller.set('controllers.page.boundsRect', section.get('osBounds'));
  },
  renderTemplate: function() {
    this._super();
    return this.render('page/section-title', {
      into: 'page',
      outlet: 'sectionTitle',
      controller: this.get('controller')
    });
  },
  actions: {
    pageClick: function() {
      // discard this event if in a section
      return false;
    },
    attachSequenceItem: function(sequence, section, sequenceItem, attached) {
      if(attached) {
        sequenceItem = this.store.createRecord('sequenceItem', {page: section.get('page'), sequence: sequence, section: section});
        debugger;
        sequenceItem.save();
      }
      else {
        section.get('sequenceItems').removeObject(sequenceItem);
        sequence.get('sequenceItems').removeObject(sequenceItem);
        sequenceItem.destroyRecord();
      }
      this.get('controller').notifyPropertyChange('sequenceItems[]');
    }
  }
});
