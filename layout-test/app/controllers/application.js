import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    expand: function() {
      console.log('got expand');
      this.set('slidingPanelExpanded', true);
    },
    contract: function() {
      console.log('got contract');
      this.set('slidingPanelExpanded', false);
    },
  },
});
