import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['inline-list', 'page-links', 'right'],
  didReceiveAttrs: function(attrs) {
    if (this.attrHelpers.didChange(attrs, 'page', 'pages')) {
      const { page, pages } = this.getProperties('page', 'pages');
      console.log(this.toString(), 'dra', page, pages);
      if (page && pages) {
        const index = pages.indexOf(page);
        console.log('index is', index, pages.get('length'));
        if(index > 0) {
          this.set('prevPage', pages.objectAt(index-1));
        }
        if((index + 1) <= pages.get('length')) {
          this.set('nextPage', pages.objectAt(index+1));
        }
      }
    }
  },
  noPrevPage: Ember.computed.not('prevPage'),
  noNextPage: Ember.computed.not('nextPage'),
});


