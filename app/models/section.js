/* global XRegExp */
/* global markdown */

import DS from "ember-data";
import config from '../config/environment';

export default DS.Model.extend({
  visibility: DS.attr('string'),
  page: DS.belongsTo('page'),
  sortOrder: DS.attr('number'),
  sequenceItems: DS.hasMany('sequenceItem'),
  translation: DS.hasOneFragment('markdown'),
  bounds: DS.hasOneFragment('rect'),
  physicalBounds: DS.hasOneFragment('rect'),
  state: DS.attr('string'),
  createdAt: DS.attr('date'),

  osBounds: function() {
    var bounds = this.get('bounds'), co;
    co = bounds && bounds.getProperties('x', 'y', 'width', 'height') || {};
    return new OpenSeadragon.Rect(co.x, co.y, co.width, co.height);
  }.property('bounds.x', 'bounds.y', 'bounds.width', 'bounds.height'),

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
  }.property('translation.md'),

  thumbUrl: function(vSize) {
    return ["",
      config.APP.dziBaseUrl,
      "/",
      (this.get('page.treatise.key')),
      "/thumbs/",
      this.get('page.slug'),
      "/section_",
      this.get('sortOrder'),
      "-",
      vSize,
      ".jpg"
    ].join("");
  },

  thumbSmall: (function() {
    return this.thumbUrl(150);
  }).property('page.slug', 'treatise.key'),

  thumbMedium: (function() {
    return this.thumbUrl(300);
  }).property('page.slug', 'treatise.key'),

  thumbLarge: (function() {
    return this.thumbUrl(600);
  }).property('page.slug', 'treatise.key')

});
