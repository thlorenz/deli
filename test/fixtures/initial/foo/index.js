'use strict';

var pack = require('./package.json');
var bar = require('bar');

var go = module.exports = function () {
  var fooInfo = pack.name + '@' + pack.version;  
  var barInfo = bar();
  return 'foo: ' + fooInfo + ' bar: ' + barInfo;
};
go()
