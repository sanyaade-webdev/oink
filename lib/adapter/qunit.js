var QUnit = module.exports = function(runner) {
  this.path    = "/test/index.html";
  this.runner  = runner;
  this.matcher = /.+\.test\.js/
};

QUnit.prototype.complete = function() {
  return window.QUnit.config.queue.length == 0;
};

// NOTE: This is currently obtained from custom JavaScript
//       in the "examples/qunit/test/index.html" file.
QUnit.prototype.errors = function() {
  return window.errors;
};

QUnit.prototype.results = function() {
  var results = window.QUnit.config.stats;

  return {
    total  : results.all,
    failed : results.bad
  };
};
