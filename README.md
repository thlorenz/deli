# ln-s
[![build status](https://secure.travis-ci.org/thlorenz/ln-s.png)](http://travis-ci.org/thlorenz/ln-s)

Links node modules in a way that plays nice with `npm dedupe`.

### Example 

Link bar module to the implementation that is foo's sibling

#### Initial structure:

```
foo/
   /.git
   /index.js
   /package.json
   /node_modules/bar
                /package.json
                /node_modules
bar/
   /.git
   /index.js
   /package.json
   /node_modules
```

#### Result:

```
foo/
   /.git
   /index.js
   /package.json
   /node_modules/bar -> ../../bar
   /node_modules/bar@
                /package.json copy of ../../bar/package.json with name package name changed to 'bar@' 
                /node_modules
bar/
   /.git
   /index.js
   /package.json
   /node_modules -> ../../foo/node_modules/bar@/node_modules
```

#### How it works:

Since we are linking the actual `bar/node_modules` back into the same directory tree structure where `bar` was installed as
a module - via the pseudo `bar@`, `npm dedupe` works as it usually does.

Essentially the `bar@` pseudo module only exists to act in place of an installed `bar` at least as far as `npm dedupe`
is concerned. 

```js
// TODO
```

## Status

Nix, Nada, Nichevo, Nothing --> go away!

## Installation

    npm install ln-s

## API


## License

MIT
