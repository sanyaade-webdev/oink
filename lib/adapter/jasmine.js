module.exports = {
  // The entry point for running the tests.
  runner: "/spec/index.html",

  // Retrieve the errors from failing tests.
  //
  // NOTE: This is currently obtained from a custom reporter in
  //       the "examples/jasmine/spec/index.html" file.
  errors: function() {
    return window.errors;
  },

  formatMessage: function(message, runner) {
    var purple = runner.color ? "\033[1;36m" : "";

    return message
      .replace(" in " + runner.url, purple + "\n     .") // Strip the server URL and move path to a new line.
      .replace(" (line ", ":")                           // Reformat line number from " (line N)" to ":N".
      .replace(")", "");
  },

  // Retrieve the total and failed number of tests.
  results: function() {
    var runner = window.jasmine.getEnv().currentRunner_;

    return {
      total  : runner.specs().length,
      failed : runner.results().failedCount
    };
  },

  // Determine if the tests have finished.
  complete: function() {
    return window.jasmine.getEnv().reporter.subReporters_[0].finished;
  }
};
