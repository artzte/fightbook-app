import BaseRoute from './_base';

var Route = BaseRoute.extend({
  model: function(params) {
    var store, treatise;

    store = this.get('store');
    treatise = store.all('treatise').findProperty('key', params.treatiseKey);

    this.set('title', treatise.get('title'));

    if (treatise.get('_detail')) {
      return treatise;
    }
    else {
      var promise = treatise.reload();
      promise.then(function(treatise) {
        treatise.set('_detail', true);
      });
      return promise;
    }
  },
  renderTemplate: function() {
    var controller = this.get('controller');
    this._super.apply(this, arguments);
    this.render('page/menu', {
      into: 'application',
      outlet: 'leftMenu',
      controller: controller
    });
  }
});

export default Route;
