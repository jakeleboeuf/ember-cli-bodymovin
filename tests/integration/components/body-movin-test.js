import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import wait from 'ember-test-helpers/wait';

moduleForComponent('body-movin', 'Integration | Component | body movin', {
  integration: true
});

test('should render', function(assert) {
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

test('should render an external path', function(assert) {
  this.render(hbs`{{body-movin path="https://jklb-os.s3.amazonaws.com/bodymovin/menu.json" external=true}}`);
  let done = assert.async();

  setTimeout(() => {
    assert.equal(this.$('svg').length, 1);
    done();
  }, 1000);
});

test('should render as svg by default', function(assert) {
  this.render(hbs`{{body-movin path="loading"}}`);
  let done = assert.async();

  setTimeout(() => {
    assert.equal(this.$('svg').length, 1);
    done();
  }, 1000);
});

test('should render as svg when set', function(assert) {
  this.render(hbs`{{body-movin path="loading"}}`);
  let done = assert.async();

  setTimeout(() => {
    assert.equal(this.$('svg').length, 1);
    done();
  }, 1000);
});

test("should send a setup action when ready", function(assert) {
  assert.expect(2);
  this.set('state', 'waiting');

  assert.equal(this.get('state'), 'waiting');

  this.render(
    hbs`{{body-movin path="loading" setup=(action (mut state) 'ready')}}`
  );

  assert.equal(this.get('state'), 'ready');
});

test('should respond to a click event', function(assert) {
  assert.expect(2);

  this.set('state', 'playing');
  assert.equal(this.get('state'), 'playing');

  this.render(
    hbs`{{body-movin path="loading" click=(action (mut state) 'paused')}}`
  );

  Ember.run(() => document.querySelector('.bodymovin').click());
  assert.equal(this.get('state'), 'paused');
});

test('should respond to multiple click events', function(assert) {
  assert.expect(3);

  this.set('state', 'playing');
  assert.equal(this.get('state'), 'playing');

  this.render(
    hbs`{{body-movin path="loading" click=(action (mut state) 'paused')}}`
  );

  Ember.run(() => document.querySelector('.bodymovin').click());
  assert.equal(this.get('state'), 'paused');

  this.set('state', 'broke');
  Ember.run(() => document.querySelector('.bodymovin').click());
  assert.equal(this.get('state'), 'paused');
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
