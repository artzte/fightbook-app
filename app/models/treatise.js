export default DS.Model.extend({
  title: DS.attr('string'),
  key: DS.attr('string'),
  visibility: DS.attr('string'),
  state: DS.attr('string'),
  createdAt: DS.attr('date'),
  pages: DS.hasMany('page'),
  copyright: DS.attr('markdown'),

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
});
