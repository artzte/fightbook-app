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
    url.push(record.sequence||record.get('sequence.id')||record.get('data.sequence.id'));
    url.push('items');
    url.push(record.section||record.get('section.id')||record.get('data.section.id'));
    return url.join('/');
  },

  // small override, send data along with buildURL
  createRecord: function(store, type, record) {
    var data = {};
    var serializer = store.serializerFor(type.typeKey);

    serializer.serializeIntoHash(data, type, record, { includeId: true });

    return this.ajax(this.buildURL(type.typeKey, null, data.sequenceItem), "POST", { data: data });
  },

  updateRecord: function(store, type, record) {
    var data = {};
    var serializer = store.serializerFor(type.typeKey);

    serializer.serializeIntoHash(data, type, record);

    var id = get(record, 'id');

    return this.ajax(this.buildURL(type.typeKey, id, data.sequenceItem), "PUT", { data: data });
  },

  deleteRecord: function(store, type, record) {
    var id = get(record, 'id');

    return this.ajax(this.buildURL(type.typeKey, id, record), "DELETE");
  }
});
