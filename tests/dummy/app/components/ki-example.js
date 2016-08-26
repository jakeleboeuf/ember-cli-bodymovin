import Ember from 'ember';

export default Ember.Component.extend({
  animation: null,
  state: {
    ready: false,
    handX: null,
    handY: null,
    initX: null,
    initY: null
  },


  actions: {

    moveYourBody(data) {
      this.set('animation', data);

      let handDown = (e) => {
        document.body.className += ' grabbing';
        this.set('state.ready', true);
        this.set('state.initX', e.clientX);
        this.set('state.initY', e.clientY);
      };

      let init = () => {
        let hand = document.getElementById('hand');
        hand.addEventListener('mousedown', handDown);
      };

      data.addEventListener('DOMLoaded', init);

    },

    handMove(e) {
      let anim = this.get('animation');
      let state = this.get('state');
      let currentX = e.clientX;
      let currentY = e.clientY;

      anim.animationData.layers[0].layers[0].ks.p.k[0].s[0] = state.handX + (currentX - state.initX);
      anim.animationData.layers[0].layers[0].ks.p.k[0].e[0] = state.handX + (currentX - state.initX);
      anim.animationData.layers[0].layers[0].ks.p.k[0].s[1] = state.handY + (currentY - state.initY);
      anim.animationData.layers[0].layers[0].ks.p.k[0].e[1] = state.handY + (currentY - state.initY);
    },

    tearDown() {
      document.body.className = document.body.className.replace(" grabbing","");
      this.set('state.ready', false);
    }


  },

  mouseDown() {
    let anim = this.get('animation');
    this.set('state.handX', anim.animationData.layers[0].layers[0].ks.p.k[0].s[0]);
    this.set('state.handY', anim.animationData.layers[0].layers[0].ks.p.k[0].s[1]);
  },

  mouseUp() {
    this.send('tearDown');
  },

  mouseLeave() {
    this.send('tearDown');
  },

  mouseMove(e) {
    if (this.get('state.ready')) {
      this.send('handMove', e);
    }
  }


});
