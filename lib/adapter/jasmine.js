module.exports = {
  // The entry point for running the tests.
  runner : "spec/index.html",

  // JavaScript to evaluate for retrieving any test errors.
  // NOTE: This is currently obtained from a custom reporter in this example.
  errors : "window.errors",

  // JavaScript to evaluate for retrieving the results object.
  results : "(function() {" +
             "  var results = window.jasmine.getEnv().currentRunner_.results();" +
             "  return { total  : results.totalCount," +
             "           failed : results.failedCount" +
             "          };" +
             "})();",

  // JavaScript to evaluate for determining if the tests have finished.
  complete : "window.jasmine.getEnv().reporter.subReporters_[0].finished"
};
