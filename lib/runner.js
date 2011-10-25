var Adapter = require("./adapter"),
    File    = require("fs"),
    HTTP    = require("http"),
    Path    = require("path"),
    WebKit  = require("webkit-server");

var Runner = module.exports = function(options) {
  this.root    = options.root;
  this.color   = options.color;
  this.adapter = options.adapter;
};

Runner.prototype.run = function() {
  this.started = Date.now();
  this.startServer(this.startBrowser.bind(this));
};

Runner.prototype.stop = function() {
  this.browser.stop();
  this.server.close();
};

Runner.prototype.startServer = function() {
  this.server = HTTP.createServer(this.onRequest.bind(this));
  this.server.listen(0, this.startBrowser.bind(this));
};

Runner.prototype.startBrowser = function() {
  this.url     = "http://localhost:" + this.server.address().port;
  this.browser = new WebKit.Browser(this.runTests.bind(this));
};

Runner.prototype.runTests = function() {
  this.browser.visit(this.url, this.waitForComplete.bind(this));
};

Runner.prototype.waitForComplete = function() {
  this.browser.evaluate(this.getAdapterCodeFor("complete"), function(complete) {
    // TODO: Add a configurable timeout for when tests never complete.
    if (!JSON.parse(complete)) {
      return setTimeout(this.waitForComplete.bind(this), 100);
    }

    this.fetchErrors();
  }.bind(this));
};

Runner.prototype.fetchErrors = function() {
  this.browser.evaluate(this.getAdapterCodeFor("errors"), function(errors) {
    try {
      errors = JSON.parse(errors);
    } catch(exception) {
      console.warn("Failed to parse errors JSON object.");
    }

    if (errors && errors.length) {
      var red  = this.color ? "\033[31m" : "",
          none = this.color ? "\033[m"   : "";

      console.log("");

      errors.forEach(function(error) {
        console.error(red + error.source + none + "\n    " + error.message.replace(this.url, "") + "\n");
      }.bind(this));
    }

    this.fetchResults();
  }.bind(this));
};

Runner.prototype.fetchResults = function() {
  this.browser.evaluate(this.getAdapterCodeFor("results"), function(results) {
    results = JSON.parse(results);

    var color = this.color ? (results.failed > 0 ? "\033[31m" : "\033[32m") : "",
        none  = this.color ? "\033[m" : "";

    console.log("Finished in " + ((Date.now() - this.started) / 1000) + " seconds.");
    console.log(
      color +
      results.total  + " test"    + (results.total  != 1 ? "s" : "") + ", " +
      results.failed + " failure" + (results.failed != 1 ? "s" : "") +
      none);

    this.stop();
  }.bind(this));
};

// TODO: This should be replaced with a third-party library.
Runner.prototype.onRequest = function(request, response) {
  var url  = request.url,
      path = this.root + (url == "/" ? this.adapter.runner : url);

  File.readFile(path, function(error, contents) {
    if (error) {
      response.writeHead(404, { "Content-Type" : "text/plain" });
      response.end("404 Not Found\n" + path);
    } else {
      var type = {
        ".css"  : "text/css",
        ".html" : "text/html",
        ".js"   : "application/javascript"
      }[Path.extname(path)];

      response.writeHead(200, { "Content-Type" : type });
      response.end(contents);
    }
  });
};

Runner.prototype.getAdapterCodeFor = function(method) {
  var code = this.adapter[method];

  if (code instanceof Function) {
    code = "(" + code + ")()";
  }

  return code;
};
