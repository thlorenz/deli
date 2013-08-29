# deli [![build status](https://secure.travis-ci.org/thlorenz/deli.png)](http://travis-ci.org/thlorenz/deli)

Dedupes a package and links one of its dependent packages to an implementation outside of the package's directory tree.

### Why?

`npm dedupe` does not affect packages linked via `npm link` or `ln -s`. This breaks in scenarios where it is crucial
that certain packages are deduped, i.e. if only one instance of them is allowed in an application.

**deli**, short for de *dupe* - li *nk*, solves this by performing the link and dedupe step concurrently to make both
features work together. In order to make the node module lookup work as if the linked package was still in the
`node_modules` directory, it creates a pseudo package and creates symbolic links as needed.


### Example 

Link bar module to the implementation that is foo's sibling and dedupe packages.

#### Initial structure:

```
.
├── bar
│   ├── index.js
│   ├── node_modules
│   │   ├── foobar-common
│   │   │   ├── index.js
│   │   │   └── package.json
│   │   └── foobar-not-common
│   │       ├── index.js
│   │       └── package.json
│   └── package.json
├── foo
│   ├── index.js
│   ├── node_modules
│   │   ├── bar
│   │   │   ├── index.js
│   │   │   ├── node_modules
│   │   │   │   ├── foobar-common
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── package.json
│   │   │   │   └── foobar-not-common
│   │   │   │       ├── index.js
│   │   │   │       └── package.json
│   │   │   └── package.json
│   │   └── foobar-common
│   │       ├── index.js
│   │       └── package.json
│   └── package.json
└── index.js
```

#### Result of running deli including `npm dedupe`

```
.
├── bar               -- implementation outside of node_modules
│   ├── index.js
│   ├── node_modules -> ../foo/node_modules/bar--__--/node_modules  -- link into main node_modules
│   └── package.json
├── foo
│   ├── index.js
│   ├── node_modules
│   │   ├── bar -> ../../bar                                -- link to implementation
│   │   ├── bar--__--                                       -- pseudo package
│   │   │   ├── node_modules
│   │   │   │   ├── foobar-common -> ../../foobar-common    -- link to deduped package
│   │   │   │   └── foobar-not-common
│   │   │   │       ├── index.js
│   │   │   │       └── package.json
│   │   │   └── package.json
│   │   └── foobar-common
│   │       ├── index.js
│   │       └── package.json
│   └── package.json
└── index.js
```

## Status

`link` is working at this point, so you could give that a try.


## Installation

    npm install deli

## API


## License

MIT
