'use strict';

module.exports = {
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  afterInstall: function() {
    let addPackages = this.addBowerPackagesToProject([
      {
        name: 'video.js',
        target: '^5.12.1'
      },
      {
        name: 'vimeo-player-js',
        target: '^1.0.1'
      }
    ]);

    return addPackages;
  }
};
