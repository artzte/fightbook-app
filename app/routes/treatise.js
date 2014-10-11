import BaseRoute from './_base';

var Route = BaseRoute.extend({
  model: function(params) {
    var store, treatise;

    store = this.get('store');
    treatise = store.all('treatise').findProperty('key', params.treatiseKey);

    this.set('title', treatise.get('title'));

    if (treatise.get('pages.length')) {
      return treatise;
    } else {
      return treatise.reload();
    }
  }
});

export default Route;
