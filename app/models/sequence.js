import DS from "ember-data";

export default DS.Model.extend({
  title: DS.attr('string'),
  state: DS.attr('string'),
  author: DS.belongsTo('user'),
  sequenceItems: DS.hasMany('sequenceItem'),
  treatise: DS.belongsTo('treatise'),
  content: DS.attr('markdown'),
  createdAt: DS.attr('date'),
  publishedAt: DS.attr('date')
});
