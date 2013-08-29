# ln-s
[![build status](https://secure.travis-ci.org/thlorenz/ln-s.png)](http://travis-ci.org/thlorenz/ln-s)

Links node modules in a way that plays nice with `npm dedupe`.

### Example 

Link bar module to the implementation that is foo's sibling

#### Initial structure:

```
.
├── bar
│   ├── index.js
│   ├── node_modules
│   │   └── foobar-common
│   │       ├── index.js
│   │       └── package.json
│   └── package.json
└── foo
    ├── index.js
    ├── node_modules
    │   ├── bar
    │   │   ├── index.js
    │   │   ├── node_modules
    │   │   │   └── foobar-common
    │   │   │       ├── index.js
    │   │   │       └── package.json
    │   │   └── package.json
    │   └── foobar-common
    │       ├── index.js
    │       └── package.json
    └── package.json
```

#### Result of running ln-s including `npm dedupe`

```
.
├── bar
│   ├── index.js -> ../../foo/node_modules/bar/index.js
│   ├── node_modules
│   │   └── foobar-common
│   │       ├── index.js
│   │       └── package.json
│   └── package.json -> ../../foo/node_modules/bar/package.json
└── foo
    ├── index.js
    ├── node_modules
    │   ├── bar
    │   │   ├── index.js
    │   │   ├── node_modules
    │   │   └── package.json
    │   └── foobar-common
    │       ├── index.js
    │       └── package.json
    └── package.json
```

#### How it works:

Since we keep the `bar` directory where it is, tools like `npm dedupe` work just as before.

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
