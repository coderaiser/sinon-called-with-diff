# Sinon called with diff [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

Add ability to show diff when args are different in [sinon](https://sinonjs.org "sinon").

## Install

```
npm i sinon sinon-called-with-diff --save
```

## How to use?

```js
const diff = require('sinon-called-with-diff');
const sinon = diff(require('sinon'));

const stub = sinon.stub();

stub('hello');

stub.calledWith('world');
// returns
false
```

Will produce output:

```sh
wrong arguments in functionStub
actual: [
  "hello"
]

expected: [
  "world"
]
```

## License

MIT

[NPMIMGURL]:                https://img.shields.io/npm/v/sinon-called-with-diff.svg?style=flat
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/sinon-called-with-diff/master.svg?style=flat
[DependencyStatusIMGURL]:   https://img.shields.io/david/coderaiser/sinon-called-with-diff.svg?style=flat
[LicenseIMGURL]:            https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]:                   https://npmjs.org/package/sinon-called-with-diff "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/sinon-called-with-diff  "Build Status"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/sinon-called-with-diff "Dependency Status"
[LicenseURL]:               https://tldrlegal.com/license/mit-license "MIT License"

[CoverageURL]:              https://coveralls.io/github/coderaiser/sinon-called-with-diff?branch=master
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/sinon-called-with-diff/badge.svg?branch=master&service=github

