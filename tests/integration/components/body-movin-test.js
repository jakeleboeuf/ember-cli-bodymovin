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

test('should render as svg by default', function(assert) {
  this.render( hbs`{{body-movin path="starwars" setup=(action (mut animation))}}`);

  return wait().then(() => {
    assert.equal(this.get('animation').animType, 'svg');
    bodymovin.destroy();
    this.clearRender();
  });
});

test('should render an external path', function(assert) {
  this.render( hbs`{{body-movin path="starwars" setup=(action (mut animation))}}`);

  return wait().then(() => {
    assert.equal(this.get('animation').animType, 'svg');
    bodymovin.destroy();
    this.clearRender();
  });
});

test('should render as svg when set', function(assert) {
  this.render( hbs`{{body-movin renderType='svg' path="starwars" setup=(action (mut animation))}}`);

  return wait().then(() => {
    assert.equal(this.get('animation').animType, 'svg');
    bodymovin.destroy();
    this.clearRender();
  });
});

test('should render as canvas when set', function(assert) {
  this.render(
    hbs`{{body-movin renderType='canvas' path="filter" setup=(action (mut animation))}}`
  );

  return wait().then(() => {
    assert.equal(this.get('animation').animType, 'canvas');
    bodymovin.destroy();
    this.clearRender();
  });
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

test('should change animation direction when `clickAction` is set to `reverse`', function(assert) {
  assert.expect(2);

  this.render(
    hbs`{{body-movin autoplay=false loop=false path="loading" setup=(action (mut animation)) clickAction='reverse'}}`
  );

  Ember.run(() => document.querySelector('.bodymovin').click());
  assert.equal(this.get('animation').playDirection, 1);

  Ember.run(() => document.querySelector('.bodymovin').click());
  assert.equal(this.get('animation').playDirection, -1);
});

test('should change animation.isPaused when `clickAction` is set to `playPause`', function(assert) {
  assert.expect(2);

  this.render(
    hbs`{{body-movin path="starwars" setup=(action (mut animation)) clickAction='playPause'}}`
  );

  Ember.run(() => document.querySelector('.bodymovin').click());
  assert.equal(this.get('animation').isPaused, 1);

  Ember.run(() => document.querySelector('.bodymovin').click());
  assert.equal(this.get('animation').isPaused, 0);
});

test('should loop by default', function(assert) {
  this.render(
    hbs`{{body-movin path="starwars" setup=(action (mut animation))}}`
  );

  assert.equal(this.get('animation').loop, true);
});

test('should not loop by when `loop` is set to `false`', function(assert) {
  this.render(
    hbs`{{body-movin loop=false path="starwars" setup=(action (mut animation))}}`
  );

  assert.equal(this.get('animation').loop, false);
});

test('should autoplay by default', function(assert) {
  this.render(
    hbs`{{body-movin path="starwars" setup=(action (mut animation))}}`
  );

  assert.equal(this.get('animation').autoplay, true);
});

test('should autoplay when `autoplay` is set to `true`', function(assert) {
  this.render(
    hbs`{{body-movin autoplay=true path="starwars" setup=(action (mut animation))}}`
  );

  assert.equal(this.get('animation').autoplay, true);
});

test('should not autoplay when `autoplay` is set to `false`', function(assert) {
  assert.expect(2);
  this.render(
    hbs`{{body-movin autoplay=false path="starwars" setup=(action (mut animation))}}`
  );

  assert.equal(this.get('animation').autoplay, false);
  assert.equal(this.get('animation').isPaused, 1);
});
