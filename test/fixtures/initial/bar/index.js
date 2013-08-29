'use strict';

var pack = require('./package.json');
var common = require('foobar-common');
var notcommon = require('foobar-not-common');

var go = module.exports = function () {
  var me = pack.name + '@' + pack.version;
  return '[ me: ' + me + ' common: ' + common() + ' not-common: ' + notcommon() + ' ] ';
};
