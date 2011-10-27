# oink

A simple test runner built on [node-webkit-server](https://github.com/tristandunn/node-webkit-server).

## Examples

### Setup

    $ npm install --local

### Jasmine ([Adapter](https://github.com/tristandunn/oink/tree/master/lib/adapter/jasmine.js), [Library](https://github.com/pivotal/jasmine))

    $ node examples/jasmine/spec/index.js

    Failures:

      1) Player #skip should throw an exception to demonstrate error reporting.
         TypeError: Result of expression 'player.skip' [undefined] is not a function.
         # ./spec/lib/player.spec.js:54

    Finished in 0.501 seconds.
    6 tests, 1 failure

### QUnit ([Adapter](https://github.com/tristandunn/oink/tree/master/lib/adapter/qunit.js), [Library](http://docs.jquery.com/QUnit))

    $ node examples/qunit/test/index.js

    Failures:

      1) Player#skip should throw an exception to demonstrate error reporting
         TypeError: Result of expression 'player.skip' [undefined] is not a function.

    Finished in 0.534 seconds.
    8 tests, 1 failure

## Options

Available options for creating an Oink.Runner instance.

#### adapter

The adapter to use when running tests. **Required.**

#### color

Whether or not to enable colored output. Defaults to `false`.

#### filter

Only run tests matching this filter, which will be converted to a regular expression automatically. Example: `(base|player)\.spec\.js`.

#### root

The root directory of your project. Your library and test files should be accessible from this directory. **Required.**

## Custom Adapters

You can easily create adapters for other test frameworks. See the [Jasmine adapter](https://github.com/tristandunn/oink/tree/master/lib/adapter/jasmine.js) for an example.

## License

oink uses the MIT license. See LICENSE for more details.
