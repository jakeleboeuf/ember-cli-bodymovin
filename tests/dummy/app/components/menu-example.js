import Ember from 'ember';

export default Ember.Component.extend({
  animation: null,
  menuState: null,

  state: {
    direction: -1,
    playing: false,
    opened: false
  },

  watchMenuState: Ember.observer('menuState', function() {
    let state = this.get('menuState');
    let animation = this.get('animation');

    if (animation && !state) {
      Ember.$('.nav-dark').removeClass('nav-dark');
      animation.setDirection(-1);
      this.set('state.direction', -1);

      animation.play();
    }
  }),

  actions: {
    setup(data) {
      this.set('animation', data);
    },

    toggle() {
      let state = this.get('menuState');
      let direction = this.get('state.direction')
      let animation = this.get('animation');


      if (state) {
        this.set('state.opened', false);
      } else {
        this.set('state.opened', true);
      }

      animation.setDirection((direction * -1))
      this.set('state.direction', (direction * -1));

      animation.play();
    }

  }

});

