import DS from 'ember-data';

export default DS.ModelFragment.extend({
  md: DS.attr('string'),
  html: DS.attr('string')
});
