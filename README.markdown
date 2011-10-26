# oink

A simple test runner built on [node-webkit-server](https://github.com/tristandunn/node-webkit-server).

## Example

### Setup

    npm install --local

### Running the Jasmine Example

    node examples/jasmine/spec/index.js

    Player #skip should throw an exception to demonstrate error reporting.
        TypeError: Result of expression 'player.skip' [undefined] is not a function. in /spec/lib/player.spec.js (line 54)

    Finished in 0.501 seconds.
    9 tests, 1 failure

## Supported Libraries

* Jasmine - [Adapter](https://github.com/tristandunn/oink/tree/master/lib/adapter/jasmine.js), [Library](https://github.com/pivotal/jasmine)

## Custom Adapters

You can easily create adapters for other test frameworks. See the [Jasmine adapter](https://github.com/tristandunn/oink/tree/master/lib/adapter/jasmine.js) for an example.

## License

oink uses the MIT license. See LICENSE for more details.
