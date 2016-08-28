import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['bodymovin'],

  path: null,
  loop: true,
  autoplay: true,
  prerender: true,
  autoloadSegments: true,
  renderType: "svg",

  setupBodymovin: Ember.on('didInsertElement', function() {
    let animation = bodymovin.loadAnimation({
      container: document.getElementById(this.get('elementId')),
      autoloadSegments: this.get('autoloadSegments'),
      renderer: this.get('renderType'),
      prerender: this.get('prerender'),
      autoplay: this.get('autoplay'),
      loop: this.get('loop'),
      path: (!this.get('external')) ? `animations/${this.get('path')}.json` : this.get('path') 
    });

    this.sendAction('onReady', animation);

  }),

  teardownBodymovin: Ember.on('willDestroyElement', function() {
    this.get('bodymovin').destroy();
  })

});
