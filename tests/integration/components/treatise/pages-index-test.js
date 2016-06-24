import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('treatise/pages-index', 'Integration | Component | treatise/pages index', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{treatise/pages-index}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#treatise/pages-index}}
      template block text
    {{/treatise/pages-index}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
