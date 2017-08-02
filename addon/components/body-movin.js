import Ember from 'ember';
import layout from '../templates/components/body-movin';

export default Ember.Component.extend({
  layout,
  classNames: ['bodymovin'],

  animation: null,
  autoloadSegments: true,
  autoplay: true,
  loop: true,
  path: null,
  prerender: false,
  renderType: 'svg',
  rendererSettings: {},
  setSubframe: false,
  clickAction: null,

  state: {
    direction: -1,
    playing: true
  },

  didInsertElement() {
    this._super(...arguments);
    let animation = bodymovin.loadAnimation({
      autoloadSegments: this.get('autoloadSegments'),
      autoplay: this.get('autoplay'),
      loop: this.get('loop'),
      path: !this.get('external')
        ? `/animations/${this.get('path')}.json`
        : this.get('path'),
      prerender: this.get('prerender'),
      renderer: this.get('renderType'),
      rendererSettings: this.get('rendererSettings'),
      setSubframe: this.get('setSubframe'),
      wrapper: document.getElementById(this.get('elementId'))
    });

    this.sendAction('setup', animation);
    this.set('animation', animation);
  },

  willDestroyElement() {
    this._super(...arguments);
    this.get('animation').destroy();
    bodymovin.destroy();
  },

  click() {
    let clickAction = this.get('clickAction');

    if (clickAction) {
      this.send(clickAction);
    }
  },

  actions: {
    reverse() {
      let animation = this.get('animation');
      let direction = this.get('state.direction') * -1;

      animation.setDirection(direction)
      this.set('state.direction', direction);

      animation.play();
    },

    toggle() {
      let animation = this.get('animation');
      let state = this.get('state');

      if (state.playing) {
        animation.pause();
        this.set('state.playing', false);
      } else {
        animation.play();
        this.set('state.playing', true);
      }
    }

  }
});
