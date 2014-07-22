export default DS.Model.extend({
  visibility: DS.attr('string'),
  page: DS.belongsTo('page'),
  sortOrder: DS.attr('number'),
  sequences: DS.hasMany('sequence'),
  translation: DS.attr('markdown'),
  bounds: DS.attr('rect'),
  physicalBounds: DS.attr('rect'),
  state: DS.attr('string'),
  createdAt: DS.attr('date'),

  //TODO still used?
  excerpt: (function() {
    var translation = this.get('translation.md') || '';
    return translation.substr(0, 100);
  }).property('translation')
});
