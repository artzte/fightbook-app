export default DS.Model.extend({
  title: DS.attr('string'),
  state: DS.attr('string'),
  author: DS.belongsTo('user'),
  sections: DS.hasMany('section'),
  content: DS.attr('string'),
  createdAt: DS.attr('date'),
  publishedAt: DS.attr('date')
});
