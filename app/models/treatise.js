import DS from "ember-data";

export default DS.Model.extend({
  title: DS.attr('string'),
  key: DS.attr('string'),
  visibility: DS.attr('string'),
  state: DS.attr('string'),
  createdAt: DS.attr('date'),
  pages: DS.hasMany('page'),
  sequences: DS.hasMany('sequence'),
  comments: DS.attr('markdown'),
  copyright: DS.attr('markdown'),

  author: DS.belongsTo('user'),
});
