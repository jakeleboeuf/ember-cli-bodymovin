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

    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import('vendor/bodymovin/bodymovin.min.js');
    }

  },

  isDevelopingAddon: function() {
    return true;
  }
};
