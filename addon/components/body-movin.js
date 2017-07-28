import Ember from 'ember';
import layout from '../templates/components/body-movin';

export default Ember.Component.extend({
  layout,
  classNames: ['bodymovin'],

  path: null,
  loop: true,
  autoplay: true,
  prerender: false,
  setSubframe: false,
  autoloadSegments: true,
  renderType: 'svg',
  animation: null,

  didInsertElement() {
    this._super(...arguments);
    let animation = bodymovin.loadAnimation({
      wrapper: document.getElementById(this.get('elementId')),
      autoloadSegments: this.get('autoloadSegments'),
      renderer: this.get('renderType'),
      prerender: this.get('prerender'),
      setSubframe: this.get('setSubframe'),
      autoplay: this.get('autoplay'),
      loop: this.get('loop'),
      path: !this.get('external')
        ? `animations/${this.get('path')}.json`
        : this.get('path')
    });

    this.sendAction('setup', animation);
    this.set('animation', animation);
  },

  willDestroyElement() {
    this._super(...arguments);
    this.get('animation').destroy();
    bodymovin.destroy();
  }
});
