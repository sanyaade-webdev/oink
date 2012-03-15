var URL = require("url");

var Mocha = module.exports = function(runner) {
  this.path    = "/test/index.html";
  this.runner  = runner;
  this.matcher = /.+\.test\.js/;
};

// TODO: Verify this is a valid completion check.
Mocha.prototype.complete = function() {
  function count(selector) {
    return document.querySelectorAll(selector).length;
  }

  return count(".test") - (count(".test.pass") + count(".test.fail")) === 0;
};

Mocha.prototype.errors = function() {
  return window.errors();
};

Mocha.prototype.results = function() {
  return {
    total  : document.querySelectorAll(".test").length,
    failed : parseInt(document.querySelector("#stats .failures em").textContent, 10)
  };
};
