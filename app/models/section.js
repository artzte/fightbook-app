/* global XRegExp */
/* global markdown */

import DS from "ember-data";

export default DS.Model.extend({
  visibility: DS.attr('string'),
  page: DS.belongsTo('page'),
  sortOrder: DS.attr('number'),
  sequenceItems: DS.hasMany('sequenceItem'),
  translation: DS.attr('markdown'),
  bounds: DS.attr('rect'),
  physicalBounds: DS.attr('rect'),
  state: DS.attr('string'),
  createdAt: DS.attr('date'),

  footnotes: function() {
    return this.get('extracts.footnotes');
  }.property('extracts.footnotes'),

  formattedContent: function() {
    var formatted = markdown.toHTML(this.get('extracts.content'));
    return formatted.replace(this.matchFootnoteReference, "<sup>$1</sup>");
  }.property('extracts.content'),

  matchFootnoteReference: /\[\^([^\]]+)\]/g,
  matchFootnoteContent: /^\[\^([^\]]+)\]:\s*(.+)$/gm,
  _extractFootnotes: function(text) {
    var extracts = {
          footnotes: [],
          content: ''
        },
        lastIndex = 0;

    XRegExp.forEach(text, this.matchFootnoteContent, function(matches) {
      var pos = text.indexOf(matches[0], lastIndex);
      extracts.footnotes.push({reference: matches[1], content: matches[2]});
      extracts.content = extracts.content.concat(text.substring(lastIndex, pos));
      lastIndex = pos + matches[0].length;
    });

    if(extracts.content === '') {
      extracts.content = text;
    }

    return extracts;
  },

  extracts: function() {
    return this._extractFootnotes(this.get('translation.md')||'');
  }.property('translation.md')

});
