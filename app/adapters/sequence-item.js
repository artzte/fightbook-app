import ApplicationAdapter from './application';
import Ember from 'ember';

var get = Ember.get;

export default ApplicationAdapter.extend({
 //TODO: when record is destroyed the association objects are no longer
 // accessible - but they are still in "data" path. Figure out why at 
 // some point.
 buildURL: function(type, id, record) {
    var url = [],
        host = get(this, 'host'),
        prefix = this.urlPrefix();
    url.push(host);
    url.push(prefix);
    url.push('sequences');
    url.push(record.get('sequence.id')||record.get('data.sequence.id'));
    url.push('items');
    url.push(record.get('section.id')||record.get('data.section.id'));
    return url.join('/');
  }
});
