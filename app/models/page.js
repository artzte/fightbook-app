import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';

export default DS.Model.extend({
  slug: DS.attr('string'),
  title: DS.attr('string'),
  visibility: DS.attr('string'),
  state: DS.attr('string'),
  createdAt: DS.attr('date'),
  sections: DS.hasMany('section'),
  treatise: DS.belongsTo('treatise'),
  sortOrder: DS.attr('number'),
  sequenceItems: DS.hasMany('sequenceItem'),

  sectionsSorted: (function() {
    return this.get('sections').sortBy('sortOrder');
  }).property('sections.@each.sortOrder'),

  dziUrl: (function() {
    return "" + config.APP.dziBaseUrl + "/" + (this.get('treatise.key')) + "/dz/" + (this.get('slug')) + ".dzi";
  }).property('slug'),

  thumbUrl: function(vSize) {
    return "" + config.APP.dziBaseUrl + "/" + (this.get('treatise.key')) + "/thumbs/" + (this.get('slug')) + "/page-" + vSize + ".jpg";
  },

  thumbSmall: (function() {
    return this.thumbUrl(150);
  }).property('slug', 'treatise.key'),

  thumbMedium: (function() {
    return this.thumbUrl(300);
  }).property('slug', 'treatise.key'),

  thumbLarge: (function() {
    return this.thumbUrl(600);
  }).property('slug', 'treatise.key'),

  bounds: (function() {
    var bottom, bottoms, bounds, left, lefts, right, rights, top, tops;
    bounds = this.get('sections.@each.bounds');
    if (bounds.get('length') > 0) {
      lefts = bounds.getEach('x');
      tops = bounds.getEach('y');
      rights = bounds.map(function(bound) {
        return bound.get('x') + bound.get('width');
      });
      bottoms = bounds.map(function(bound) {
        return bound.get('y') + bound.get('height');
      });
      top = tops.sort().shift();
      left = lefts.sort().shift();
      bottom = bottoms.sort().pop();
      right = rights.sort().pop();
      return new OpenSeadragon.Rect(left, top, right - left, bottom - top);
    } else {
      return null;
    }
  }).property('sections.@each.bounds'),

  footnotes: function() {
    var sections = this.get('sectionsSorted'),
        pageFootnotes = Ember.ArrayProxy.create({content: []});

    sections.forEach(function(section) {
      pageFootnotes.addObjects(section.get('extracts.footnotes'));
    });
    return pageFootnotes;
  }.property('sections.@each.footnotes')
});
