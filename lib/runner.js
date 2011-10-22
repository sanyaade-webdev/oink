var Adapter = require("./adapter"),
    File    = require("fs"),
    HTTP    = require("http"),
    Path    = require("path"),
    WebKit  = require("webkit-server");

var Runner = module.exports = function(options) {
  this.root    = options.root;
  this.port    = options.port || 3100;
  this.url     = "http://localhost:" + this.port + "/index.html"
  this.adapter = options.adapter;
};

Runner.prototype.run = function() {
  this.startServer(this.startBrowser.bind(this));
};

Runner.prototype.stop = function() {
  this.browser.stop();
  this.server.close();
};

Runner.prototype.startServer = function() {
  this.server = HTTP.createServer(this.onRequest.bind(this));
  this.server.listen(this.port, this.startBrowser.bind(this));
};

Runner.prototype.startBrowser = function() {
  this.browser = new WebKit.Browser(this.runTests.bind(this));
};

Runner.prototype.runTests = function() {
  this.browser.visit(this.url, this.waitForComplete.bind(this));
};

Runner.prototype.waitForComplete = function() {
  this.browser.command("Evaluate", this.adapter.complete, function(complete) {
    // TODO: Add a configurable timeout for when tests never complete.
    if (!JSON.parse(complete)) {
      return setTimeout(this.waitForComplete.bind(this), 100);
    }

    this.fetchErrors();
  }.bind(this));
};

Runner.prototype.fetchErrors = function() {
  this.browser.command("Evaluate", this.adapter.errors, function(errors) {
    try {
      errors = JSON.parse(errors);
    } catch(exception) {
      console.warn("Failed to parse errors JSON object.");
    }

    if (errors && errors.length) {
      console.log("");

      errors.forEach(function(error) {
        console.error(error.source + "\n    " + error.message + "\n");
      });
    }

    this.fetchResults();
  }.bind(this));
};

Runner.prototype.fetchResults = function() {
  this.browser.command("Evaluate", this.adapter.results, function(results) {
    results = JSON.parse(results);

    console.log(results.passed + " passed, " +
                results.failed + " failed, " +
                results.total  + " total");

    this.stop();
  }.bind(this));
};

// TODO: This should be replaced with a third-party library.
Runner.prototype.onRequest = function(request, response) {
  var path = request.url == "/index.html" ?
             this.root + "/" + this.adapter.runner :
             this.root + request.url;

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
