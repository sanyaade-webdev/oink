var URL = require("url");

var Jasmine = module.exports = function(runner) {
  this.path    = "/spec/index.html";
  this.runner  = runner;
  this.matcher = /.+\.spec\.js/
};

Jasmine.prototype.complete = function() {
  return window.jasmine.getEnv().reporter.subReporters_[0].finished;
};

// NOTE: This is currently obtained from a custom reporter in
//       the "examples/jasmine/spec/index.html" file.
Jasmine.prototype.errors = function() {
  return window.errors;
};

Jasmine.prototype.formatMessage = function(message) {
  var runner = this.runner,
      purple = runner.color ? "\033[1;36m" : "",
      url    = URL.parse(runner.url),
      url    = url.protocol + "//" + url.host;

  return message
    // Strip the server URL and move path to a new line.
    .replace(" in " + url, purple + "\n     .")
    // Reformat line number from " (line N)" to ":N".
    .replace(" (line ", ":").replace(/\)$/, "");
};

Jasmine.prototype.results = function() {
  var runner = window.jasmine.getEnv().currentRunner_;

  return {
    total  : runner.specs().length,
    failed : runner.results().failedCount
  };
};
