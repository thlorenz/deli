'use strict';

var path = require('path')
  , fs = require('fs')
  , rmrf = require('rimraf')
  , ncp = require('ncp')
  ;


// Readme Example:
// foo/node_modules/bar is src
// bar                  is tgt 
var go = module.exports = function (opts, cb) {
  // All steps can by sync since this will only be used as part of a command line tool
  // TODO: Allow just passing bar and figure out that it is in ./node_modules

  var root              =  opts.root || ''
    , src               =  path.resolve(root, opts.src)
    , tgt               =  path.resolve(root, opts.tgt)
    , pseudo            =  src + '@'

    , srcNodeModules    =  path.join(src, 'node_modules')
    , tgtNodeModules    =  path.join(tgt, 'node_modules')
    , pseudoNodeModules =  path.join(pseudo, 'node_modules')

    , tgtPackage        =  path.join(tgt, 'package.json')
    , pseudoPackage     =  path.join(pseudo, 'package.json')
    ;

  // Create pseudo package (bar@)
  try {
    rmrf.sync(pseudo);
    fs.mkdirSync(pseudo);
  } catch (e) {
    console.error(e);
  }
  
  // 2. Move ../bar/node_modules to ./node_modules/bar@/node_modules
  ncp(tgtNodeModules, pseudoNodeModules, function (err) {
    rmrf.sync(tgtNodeModules);    

    // 3. Link ../bar/node_modules to ./node_modules/bar@/node_modules
    fs.symlinkSync(pseudoNodeModules, tgtNodeModules); 

    // 4. Link ./node_modules/bar@/package.json to ../bar/package.json
    fs.symlinkSync(tgtPackage, pseudoPackage); 

    // 5. Remove ./node_modules/bar
    rmrf.sync(src);

    // 6. Link ./node_modules/bar to ../bar/node_modules
    fs.symlinkSync(tgt, src);
    
    // 7. Run npm dedupe unless --nodedupe is set
    // 8  Run npm install if --reinstall is set
  });
};


// Test
if (!module.parent) {

  var cp = require('child_process')
  var exec = cp.exec;
  var fixtures = path.join(__dirname, 'test', 'fixtures');
  var from = path.join(fixtures, 'initial');
  var to = path.join(fixtures, 'initial-a');

  rmrf.sync(to);
  ncp(from, to, function (err) {
    if (err) return console.error(err);

    var root = path.join(fixtures, 'initial-a', 'foo');

    var opts = {
        root: root
      , src: path.join('node_modules', 'bar')
      , tgt: path.join('..', 'bar')
    }

    go(opts);
    
  });
}

