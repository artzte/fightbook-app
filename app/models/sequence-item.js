import DS from "ember-data";

var attr = DS.attr;

export default DS.Model.extend({
  page: DS.belongsTo('page'),
  section: DS.belongsTo('section', {async: true}),
  sequence: DS.belongsTo('sequence'),
  title: attr('string'),
  commentary: DS.hasOneFragment('markdown'),
  createdAt: attr('date')
});
