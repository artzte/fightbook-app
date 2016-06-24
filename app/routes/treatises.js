import BaseRoute from './_base';

var Route = BaseRoute.extend({
  title: 'Treatises',
  model: function() {
    return this.get('store').findAll('treatise');
  }
});

export default Route;
