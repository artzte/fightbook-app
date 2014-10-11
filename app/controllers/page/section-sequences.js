import Ember from "ember";

export default Ember.ObjectController.extend({
  needs: ['section', 'page'],
  attached: function(key, value) {
    var section = this.get('parentController.model'),
        sectionSequences = section.get('sequenceItems'),
        sequence = this.get('model'),
        sequenceItem = sectionSequences.findBy('sequence.id', sequence.get('id'));

    if(arguments.length>1) {
      this.send('attachSequenceItem', sequence, section, sequenceItem, value);
      return value;
    }
    else {
      return !!sequenceItem;
    }
  }.property('parentController.model', 'model')
});
