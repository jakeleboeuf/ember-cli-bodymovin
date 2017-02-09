import Ember from 'ember';
import fetch from 'ember-network/fetch';

export default Ember.Component.extend({
  player: null,
  state: {
    ready: true,
    paused: true
  },
  vimeoId: null,
  videoImage: null,

  didInsertElement() {
    this._super(...arguments);
    this.send('setupVideo');
  },
  actions: {
    setupVideo() {
      let vimeoId = this.get('vimeoId');
      this.send('getThumbnail', vimeoId);

      let options = {
        id: vimeoId,
        width: 640,
        loop: true,
        portrait: false,
        title: false,
        autoplay: false
      };

      let player = new Vimeo.Player('video-container', options);
      this.set('player', player);

    },
    getThumbnail(id) {
      // Vimeo Thumbnails
      let idImg = '*[data-video-id="' + id + '"]';
      let url = '//vimeo.com/api/v2/video/' + id + '.json';

      // Use fetch API
      fetch(url)
        .then(r => r.json())
        .then(data => {
          $(idImg).attr('src', data[0].thumbnail_large.replace('640', '960'));
          this.set('videoImage', data[0].thumbnail_large.replace('640', '960'));
        })
        .catch(e => console.log(e, "Booo"));

    },
    playVideo() {
      let isReady = this.get('state.ready');
      this.get('player').play();
      this.set('state.paused', false);

      if (isReady) {
        this.$().find('.video-player--embed').show();
        this.$().find('.video-player--image').hide();
        this.set('state.ready', false);
      }
    },
    pauseVideo() {
      // Prep and play video
      this.get('player').pause();
      this.set('state.paused', true);
    }
  }
});
