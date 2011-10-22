# oink

A simple test runner built on [node-webkit-server](https://github.com/tristandunn/node-webkit-server).

## Example

### Setup

    npm install --local

### Running the Jasmine Example

    node example/spec/index.js

    Player #skip should throw an exception to demonstrate error reporting.
        TypeError: Result of expression 'player.skip' [undefined] is not a function. in http://localhost:3100/spec/lib/player.spec.js (line 54)

    8 passed, 1 failed, 9 total

## Supported Libraries

* Jasmine - [Adapter](https://github.com/tristandunn/oink/tree/master/lib/adapter/jasmine.js), [Library](https://github.com/pivotal/jasmine)

## Custom Adapters

You can easily create adapters for other test frameworks. See the [Jasmine adapter](https://github.com/tristandunn/oink/tree/master/lib/adapter/jasmine.js) for an example.

## License

oink uses the MIT license. See LICENSE for more details.
