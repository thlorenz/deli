'use strict';

// Readme Example:
// foo/node_modules/bar is src
// bar                  is tgt 
var go = module.exports = function (root, src, tgt, cb) {
  // 1. Create pseudo package (bar@)
  // 2. Move ../bar/node_modules to ./node_modules/bar@/node_modules
  // 3. Link ../bar/node_modules to ./node_modules/bar@/node_modules
  // 4. Link ./node_modules/bar@/package.json to ../bar/package.json
  // 5. Remove ./node_modules/bar
  // 6. Link ./node_modules/bar to ../bar/node_modules
  // 7. Run npm dedupe unless --nodedupe is set
  // 8  Run npm install if --reinstall is set
};




