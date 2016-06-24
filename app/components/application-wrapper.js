import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    window.onbeforeunload = () => {
      console.log('found update queue', this.get('updateQueue'));

      if (this.get('updateQueue.length')) {
        this.send('flushUpdateQueue');
        return "Are you sure you want to navigate away before saving your changes?";
      }
    };
  }
});
