'use strict';

var test =  require('tap').test
var path =  require('path')
var rmrf =  require('rimraf')
  , ncp  =  require('ncp')

var link = require('../lib/link');

var fixtures = path.join(__dirname, 'fixtures');
var from = path.join(fixtures, 'initial');
var to = path.join(fixtures, 'initial-a');

function clean() {
  rmrf.sync(to)
}

test('\nlinking foo and bar', function (t) {
  clean()
  
  ncp(from, to, function (err) {
    if (err) return t.fail(err);

    var root = path.join(fixtures, 'initial-a', 'foo');
    console.log('copied');

    var opts = {
        root: root
      , src: path.join('node_modules', 'bar')
      , tgt: path.join('..', 'bar')
      , loglevel: 'silly'
    }

    link(opts, function (err) {
      if (err) return console.error(err);
      console.log(require('../test/fixtures/initial-a/')());
      t.end();
    });
  })
})
