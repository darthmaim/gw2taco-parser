# gw2taco-parser

[![version][npm-badge]][npm]
[![license][license-badge]](LICENSE)
[![Travis][travis-badge]][travis]
[![Coverage][coverage-badge]][coverage]

[npm-badge]: https://img.shields.io/npm/v/gw2taco-parser.svg?style=flat-square
[license-badge]: https://img.shields.io/github/license/darthmaim/gw2taco-parser.svg?style=flat-square
[travis-badge]: https://img.shields.io/travis/darthmaim/gw2taco-parser.svg?style=flat-square
[coverage-badge]: https://img.shields.io/codecov/c/github/darthmaim/gw2taco-parser.svg?style=flat-square
[npm]: https://www.npmjs.com/package/gw2taco-parser
[travis]: https://travis-ci.org/darthmaim/gw2taco-parser
[coverage]: https://codecov.io/github/darthmaim/gw2taco-parser

Parse [GW2 TacO](http://www.gw2taco.com) marker data.

## Installation

```
npm install --save gw2taco-parser
```

## Usage

### parsing trails

```js
import { parseTrailFromFile } from 'gw2taco-parser';

parseTrailFromFile('test.trl').then((trail) => {
    console.log(trail);
    // { version: 0, mapId: 123, trails: [] }
});
```

## License

**gw2taco-parser** is licensed under the [MIT License](LICENSE).
