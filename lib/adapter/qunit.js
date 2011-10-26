module.exports = {
  // The entry point for running the tests.
  runner: "/test/index.html",

  // Retrieve the errors from failing tests.
  //
  // NOTE: This is currently obtained from custom JavaScript
  //       in the "examples/qunit/test/index.html" file.
  errors: function() {
    return window.errors;
  },

  // Retrieve the total and failed number of tests.
  results: function() {
    var results = window.QUnit.config.stats;

    return {
      total  : results.all,
      failed : results.bad
    };
  },

  // Determine if the tests have finished.
  complete: function() {
    return window.QUnit.config.queue.length == 0;
  }
};
