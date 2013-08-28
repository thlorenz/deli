var foo = require('./foo')

var go = module.exports = function () {
  return 'foo: ' + foo();
};

if (!module.parent) {
  console.log(go());
}
