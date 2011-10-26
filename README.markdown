# oink

A simple test runner built on [node-webkit-server](https://github.com/tristandunn/node-webkit-server).

## Example

### Setup

    npm install --local

### Running the Jasmine Example

    node examples/jasmine/spec/index.js

    Failures:

      1) Player #skip should throw an exception to demonstrate error reporting.
         TypeError: Result of expression 'player.skip' [undefined] is not a function.
         # ./spec/lib/player.spec.js:54

    Finished in 0.501 seconds.
    6 tests, 1 failure

### Running the QUnit Example

    node examples/qunit/test/index.js

    Failures:

      1) Player#skip should throw an exception to demonstrate error reporting
         TypeError: Result of expression 'player.skip' [undefined] is not a function.

    Finished in 0.534 seconds.
    8 tests, 1 failure

## Supported Libraries

* Jasmine - [Adapter](https://github.com/tristandunn/oink/tree/master/lib/adapter/jasmine.js), [Library](https://github.com/pivotal/jasmine)
* QUnit - [Adapter](https://github.com/tristandunn/oink/tree/master/lib/adapter/qunit.js), [Library](http://docs.jquery.com/QUnit)

## Custom Adapters

You can easily create adapters for other test frameworks. See the [Jasmine adapter](https://github.com/tristandunn/oink/tree/master/lib/adapter/jasmine.js) for an example.

## License

oink uses the MIT license. See LICENSE for more details.
