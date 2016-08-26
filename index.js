/* jshint node: true */
'use strict';

module.exports = {
  name: 'bodymovin',

  included: function(app) {
    this._super.included(app);

    this.ui.writeLine("Let's get bodymovin!");
    app.import('vendor/bodymovin.js');
  },

  isDevelopingAddon: function() {
    return true;
  }
};
