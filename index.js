/* eslint-env node */
'use strict';

var path = require('path');
var MergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');
var map = require('broccoli-stew').map;

module.exports = {
  name: 'ember-cli-bodymovin',

  treeForVendor(vendorTree) {
    var bodymovin = new Funnel(
      path.join(
        this.project.root,
        'node_modules',
        'bodymovin/build/player'
      ),
      { files: ['bodymovin.min.js'] }
    );

    bodymovin = map(
      bodymovin,
      content => `if (typeof FastBoot === 'undefined') { ${content} }`
    );

    return vendorTree ? new MergeTrees([vendorTree, bodymovin]) : bodymovin;
  },

  included() {
    this.import('vendor/bodymovin.min.js');
  }

};
