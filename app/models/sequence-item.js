import DS from "ember-data";

export default DS.Model.extend({
  page: DS.belongsTo('page'),
  section: DS.belongsTo('section'),
  sequence: DS.belongsTo('sequence'),
  title: DS.attr('string'),
  commentary: DS.hasOneFragment('markdown')
});
