'use strict';

var path =  require('path');

var go = module.exports = function (opts) {
  
  var root              =  opts.root || ''
    , src               =  path.resolve(root, opts.src)

    // assume that the root dir is where our main package whose dependend we are linking is located
    , main              =  root
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

  return {
      root       :  root
    , src        :  src
    , main       :  main
    , tgt        :  tgt
    , pseudo     :  pseudo
    , pseudoName :  pseudoName

    , srcNodeModules    :  srcNodeModules
    , mainNodeModules   :  mainNodeModules
    , tgtNodeModules    :  tgtNodeModules
    , pseudoNodeModules :  pseudoNodeModules

    , tgtPackage    :  tgtPackage
    , pseudoPackage :  pseudoPackage
  }
};
