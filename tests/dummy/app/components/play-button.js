import Ember from 'ember';

export default Ember.Component.extend({
  animation: null,
  state: {
    playing: false
  },

  actions: {
    setup(data) {
      this.set('animation', data);
    },

    toggle() {
      let state = this.get('state');
      let animation = this.get('animation');

      if (state.playing) {
        animation.setDirection(-1);
        animation.play();
        this.send('pauseVideo');
        this.set('state.playing', false);
      } else {
        animation.setDirection(0);
        animation.play();
        this.send('playVideo');
        this.set('state.playing', true);
      }
    }

  }

});
