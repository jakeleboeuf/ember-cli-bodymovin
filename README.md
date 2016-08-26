# ember-cli-bodymovin

A little wrapper for [Bodymovin](https://github.com/bodymovin/bodymovin), an After Effects plugin for exporting animations to svg/canvas/html + js. This is still in development, so be warned!

## Installation

`ember install ember-cli-bodymovin`

## Usage

Rendering your animation out of AE using the [bodymovin extention](https://github.com/bodymovin/bodymovin#installing-extension-finally-the-plugin-is-on-the-adobe-add-ons) will generate a `json` representaion of your animation. COol.

Grab that puppy and drop it into your app's public dir `public/animations/coolFileName.json`. Then all you need to do is drop that sucker onto the page:

##### Basic usage
`{{body-movin animation='coolFileName'}}`

##### External Files

Sometimes you may need or want to host your animation json somewhere else. No problem, just set `external=true` and include the full path.
```
{{body-movin
	animation='//lab.nearpod.com/bodymovin/demo/pancakes/data.json'
	external=true}}
```

## Interacting with your animation
You can use any of the Bodymovin.js primitives in your Component/Controller. [Check them out](https://github.com/bodymovin/bodymovin#usage).

```hbs
// templates/component/playPause-animation.hbs

{{body-movin
	path='reel'
	onReady=(action setup)
	click=(action toggle)
	}}

```

```javascript
// component/playPause-animation.js

import Ember from 'ember';

export default Ember.Component.extend({
  animation: null,
  state: {
    playing: true
  },

  actions: {
    setup(data) {
      this.set('animation', data);
    },

    toggle() {
      let state = this.get('state');
      let animation = this.get('animation');

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

```


## Options
You can override all the default stuff as you'd expect.

```
{{body-movin
	animation='loading'
	renderStyle='canvas'
	autoplay=false
	autorender=true
	click=(action 'submit') // Handle in your component/controller
	onReady=(action 'setup') // Handle in your component/controller
}}
```

#### animation (String)
The file name OR url of your animation.

#### external (Boolean)
Set this to true if you're including an external source as your `animation`.

#### renderType (String)
Set to 'svg' / 'canvas' / 'html' to set the renderer. If you leave it of, we'll default to our favorite- `SVG`.

#### loop (String)
true / false / number

#### autoplay (Boolean)
true / false / number


# Contributing

Hook it up!

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
