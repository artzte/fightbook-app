import DS from "ember-data";

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export default DS.Model.extend({
  page: DS.belongsTo('page'),
  section: DS.belongsTo('section'),
  sequence: DS.belongsTo('sequence'),
  title: DS.attr('string'),
  commentary: DS.hasOneFragment('markdown')
});
