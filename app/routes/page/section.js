import BaseRoute from '../_base';

export default BaseRoute.extend({
  model: function(params) {
    var page = this.modelFor('page');

    return page.get('sections').findBy('sortOrder', parseInt(params.sortOrder, 10));
  },
  setupController: function(controller, section) {
    var page = this.modelFor('page');
    this._super.apply(this, arguments);

    this.set('title', [page.get('treatise.title'), page.get('title'), "Section " + (section.get('sortOrder'))].join(' - '));

    controller.set('page', page);
    controller.set('section', section);

    this.send('setSection', section);
    this.send('setBounds', section.get('osBounds'));
  },
  renderTemplate: function(controller) {
    this._super(...arguments);
    return this.render('page/section-title', {
      into: 'page',
      outlet: 'sectionTitle',
      controller: controller,
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
      }
      else {
        sequenceItem.deleteRecord();
      }
      sequenceItem.save();
      this.get('controller').notifyPropertyChange('sequenceItems[]');
    }
  }
});
