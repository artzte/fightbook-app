import BaseRoute from './_base';

var Route = BaseRoute.extend({
  title: 'Treatises',
  model: function() {
    return this.get('store').find('treatise');
  }
});

export default Route;
