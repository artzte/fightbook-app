import DS from "ember-data";

export default DS.Model.extend({
  name: DS.attr('string'),
  isAdmin: DS.attr('boolean'),
  treatises: DS.hasMany('treatise', {inverse: 'author'})
});
