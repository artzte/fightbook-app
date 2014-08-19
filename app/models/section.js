import DS from "ember-data";

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

});
