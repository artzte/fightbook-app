import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['main', 'main-all', 'thumbs-wrapper'],
  pagesSortOrder: ['sortOrder'],
  pagesSorted: Ember.computed.sort('treatise.pages', 'pagesSortOrder'),
});


/*
 * 
  pagesSorted: (function() {
    return this.get('pages').sortBy('sortOrder');
  }).property('pages.@each.sortOrder'),

  nextPage: function(page) {
    var index, pages;
    pages = this.get('pagesSorted');
    if (Ember.isEmpty(pages)) {
      return null;
    }
    index = pages.indexOf(page);
    if (index === -1) {
      return;
    }
    if (index === pages.lastIndexOf()) {
      return null;
    } else {
      return pages.objectAt(index + 1);
    }
  },

  prevPage: function(page) {
    var index, pages;
    pages = this.get('pagesSorted');
    if (Ember.isEmpty(pages)) {
      return null;
    }
    index = pages.indexOf(page);
    if (index <= 0) {
      return;
    }
    return pages.objectAt(index - 1);
  }
*/
