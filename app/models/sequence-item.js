import DS from "ember-data";

export default DS.Model.extend({
  page: DS.belongsTo('page'),
  section: DS.belongsTo('section'),
  sequence: DS.belongsTo('sequence'),
  title: DS.attr('string'),
  commentary: DS.hasOneFragment('markdown'),

  sortPosition: function(key, value) {
    var pageOrder = this.get('page.sortOrder'),
        sectionOrder = this.get('section.sortOrder');
    if(arguments.length > 1) {
      this.set('sortPosition', value);
    }
    else {

    }



  }.property('page.sortOrder', 'section.sortOrder');
});
