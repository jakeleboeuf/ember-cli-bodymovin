import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('body-movin', 'Integration | Component | body movin', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{body-movin path="loading"}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#body-movin path="loading"}}
      template block text
    {{/body-movin}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('it renders as svg', function(assert) {
  this.render(hbs`{{body-movin path="loading" renderType="svg"}}`);

  return wait().then(() => {
    assert.equal(this.$('svg').length, 1);
  });
});

// test('it renders as canvas', function(assert) {
//   this.render(hbs`{{body-movin path="loading" renderType="canvas"}}`);


//   return wait().then(() => {
//     let canvas = this.$('canvas').get(0);
//     bodymovin.destroy();
//     this.clearRender();
//     assert.notEqual(canvas, undefined);
//   });

// });
