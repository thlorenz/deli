'use strict';

var pack = require('./package.json');
var go = module.exports = function () {
  return pack.name + '@' pack.version;  
};
