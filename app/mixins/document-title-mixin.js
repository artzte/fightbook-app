import Ember from "ember";
import config from '../config/environment';

// via Jonathon Evans / http://jrhe.co.uk/setting-the-document-title-in-ember-js-apps
//
export default Ember.Mixin.create({
  actions: {
    _setupTitle: function() {
      var title;
      title = this.get('title');
      if (title) {
        document.title = config.APP.title.concat(" - ", title);
        return false;
      } else {
        document.title = config.APP.title;
        return true;
      }
    },
    didTransition: function() {
      return this.send('_setupTitle');
    }
  }
});
