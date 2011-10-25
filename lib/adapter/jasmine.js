module.exports = {
  // The entry point for running the tests.
  runner: "spec/index.html",

  // Retrieve the errors from failing tests.
  //
  // NOTE: This is currently obtained from a custom reporter in this example.
  errors: function() {
    return window.errors;
  },

  // Retrieve the total and failed number of tests.
  results: function() {
    var results = window.jasmine.getEnv().currentRunner_.results();

    return {
      total  : results.totalCount,
      failed : results.failedCount
    };
  },

  // Determine if the tests have finished.
  complete: function() {
    return window.jasmine.getEnv().reporter.subReporters_[0].finished;
  }
};
