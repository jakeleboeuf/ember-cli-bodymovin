/* jshint node: true */
'use strict';
var path = require("path");
var resolve = require("resolve");
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'bodymovin',

  treeForVendor(tree) {
    var tcpPath = path.dirname(resolve.sync('bodymovin'));
    var tcpTree = new Funnel(tcpPath, {
      files: ['bodymovin.min.js'],
      destDir: '/bodymovin',
    });

    return new MergeTrees([tree, tcpTree]);
  },

  included: function(app) {
    this._super.included(app);

    this.ui.writeLine("Let's get bodymovin!");

    app.import('vendor/bodymovin/bodymovin.min.js');
    app.import('vendor/vimeo.js');

    app.import(app.bowerDirectory + '/video.js/dist/video-js.min.css');
    app.import(app.bowerDirectory + '/video.js/dist/video.min.js');
    app.import(app.bowerDirectory + '/video.js/dist/video-js.min.css');

  },

  isDevelopingAddon: function() {
    return true;
  }
};
