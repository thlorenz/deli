'use strict';

var path =  require('path')
  , fs   =  require('fs')
  , rmrf =  require('rimraf')
  , ncp  =  require('ncp')
  , cp   =  require('child_process')
  , exec =  cp.exec
  , spawn =  cp.spawn
  ;


// Handling only direct node_modules i.e. contained right inside the node_modules dir
// Comments based on foo and bar being sibling dirs and foo having installed bar as inside ./foo/node_modules:
// src: ./foo/node_modules/bar 
// tgt: ../bar                  
var go = module.exports = function (opts, cb) {
  // All steps can by sync since this will only be used as part of a command line tool
  // TODO: Allow just passing bar and figure out that it is in ./node_modules

  var root              =  opts.root || ''
    , src               =  path.resolve(root, opts.src)
      // two up from the node_module we are linking
    , main              =  path.dirname(src).split(path.sep).slice(0, -1).join(path.sep)
    , tgt               =  path.resolve(root, opts.tgt)
    , pseudo            =  src + '--__--'
    , pseudoName        =  path.basename(pseudo)
     
    , srcNodeModules    =  path.join(src, 'node_modules')
    , mainNodeModules   =  path.join(main, 'node_modules')
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
  
  // Move ../bar/node_modules to ./node_modules/bar@/node_modules
  ncp(tgtNodeModules, pseudoNodeModules, function (err) {
    rmrf.sync(tgtNodeModules);    

    // Link ./bar/node_modules -> ./foo/node_modules  -- to simulate upwards lookup for deduped modules which breaks when linked
    fs.symlinkSync(mainNodeModules, tgtNodeModules); 
    
    // Link ./bar/node_modules/node_modules -> ./foo/node_modules/bar/node_modules -- for non-deduped modules
    fs.symlinkSync(pseudoNodeModules, path.join(tgtNodeModules, 'node_modules'));

    // Copy ../bar/package.json to ./node_modules/bar@/package.json and set name to 'bar@'
    var pkg = require(tgtPackage);
    pkg.name = pseudoName;
    fs.writeFileSync(pseudoPackage, JSON.stringify(pkg, null, 2), 'utf8');

    // Remove ./node_modules/bar
    rmrf.sync(src);

    // Link ./node_modules/bar -> ../bar
    fs.symlinkSync(tgt, src);
    
    // Run npm dedupe unless --nodedupe is set
    var dedupe = exec('npm dedupe', { cwd: root }, function (err) {
      if (err) return console.error(err);
      console.log(require('./test/fixtures/initial-a/')());
    })
    dedupe.stdout.pipe(process.stdout);
    dedupe.stderr.pipe(process.stderr);


    // Run npm install if --reinstall is set
  });
};


// Test
if (!module.parent) {

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

