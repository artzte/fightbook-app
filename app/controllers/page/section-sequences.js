import Ember from "ember";

export default Ember.ObjectController.extend({
  needs: ['section', 'page'],
  _itemData: function() {
    var data = {};

    data.section = this.get('parentController.model');
    data.sectionSequences = data.section.get('sequenceItems');
    data.sequence = this.get('model');
    data.sequenceItem = data.sectionSequences.findBy('sequence.id', data.sequence.get('id'));

    return data;
  }.property('parentController.sequenceItems[]', 'model'),
  attached: function(key, value) {
    var itemData = this.get('_itemData');
    if(arguments.length>1) {
      this.send('attachSequenceItem', itemData.sequence, itemData.section, itemData.sequenceItem, value);
      return value;
    }
    else {
      return !!itemData.sequenceItem;
    }
  }.property('_itemData'),
  sequenceItem: Ember.computed.alias('_itemData.sequenceItem'),
  actions: {
    saveItem: function() {
      var item = this.get('sequenceItem');
      if(item && item.get('isDirty')) {
        item.save();
      }
    }
  }
});
