import ApplicationAdapter from './application';
import Ember from 'ember';

var get = Ember.get;

export default ApplicationAdapter.extend({
 buildURL: function(type, id, record) {
    var url = [],
        host = get(this, 'host'),
        prefix = this.urlPrefix();
    url.push(host);
    url.push(prefix);
    url.push('sequences');
    url.push(record.get('data.sequence.id'));
    url.push('items');
    url.push(record.get('data.section.id'));
    return url.join('/');
  }
});
