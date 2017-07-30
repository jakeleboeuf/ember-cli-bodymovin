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

  didInsertElement() {
    this._super(...arguments);
    let animation = bodymovin.loadAnimation({
      autoloadSegments: this.get('autoloadSegments'),
      autoplay: this.get('autoplay'),
      loop: this.get('loop'),
      path: !this.get('external')
        ? `animations/${this.get('path')}.json`
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
  }
});
