import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sliding-panel-fade-screen', 'Integration | Component | sliding panel fade screen', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{sliding-panel-fade-screen}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#sliding-panel-fade-screen}}
      template block text
    {{/sliding-panel-fade-screen}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
