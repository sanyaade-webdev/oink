var Adapter = require("./adapter"),
    File    = require("fs"),
    HTTP    = require("http"),
    Path    = require("path"),
    WebKit  = require("webkit-server");

var Runner = module.exports = function(options) {
  if (!options.adapter) { throw new Error("Please specify a valid adapter."); }

  if (!options.url && !options.root) {
    throw new Error("Please specify a root or a URL.");
  }

  this.url     = options.url;
  this.root    = options.root;
  this.color   = options.color === true;
  this.filter  = options.filter ? new RegExp(options.filter) : false;
  this.adapter = new options.adapter(this);
};

Runner.prototype.run = function() {
  this.started = Date.now();

  if (this.url) {
    this.startBrowser();
  } else {
    this.startServer();
  }
};

Runner.prototype.stop = function(code) {
  this.browser.stop();

  if (this.server) {
    this.server.close();
  }

  process.exit(code);
};

Runner.prototype.startServer = function() {
  this.server = HTTP.createServer(this.onRequest.bind(this));
  this.server.listen(0, this.startBrowser.bind(this));
};

Runner.prototype.startBrowser = function() {
  this.url     = this.url || "http://localhost:" + this.server.address().port;
  this.browser = new WebKit.Browser(this.runTests.bind(this));
};

Runner.prototype.runTests = function() {
  this.browser.visit(this.url, this.waitForComplete.bind(this));
};

Runner.prototype.waitForComplete = function() {
  this.browser.evaluate(this.getAdapterCodeFor("complete"), function(error, complete) {
    // TODO: Add a configurable timeout for when tests never complete.
    if (!JSON.parse(complete)) {
      return setTimeout(this.waitForComplete.bind(this), 100);
    }

    this.fetchErrors();
  }.bind(this));
};

Runner.prototype.fetchErrors = function() {
  this.browser.evaluate(this.getAdapterCodeFor("errors"), function(error, errors) {
    try {
      errors = JSON.parse(errors);
    } catch(exception) {
      console.warn("Failed to parse errors JSON object.");
    }

    if (errors && errors.length) {
      var red  = this.color ? "\033[31m" : "",
          none = this.color ? "\033[m"   : "";

      console.log("\nFailures:\n");

      errors.forEach(function(error, index) {
        var message = this.adapter.formatMessage ?
                      this.adapter.formatMessage(error.message) :
                      error.message;

        console.error(
          "  "    + (index + 1) + ") " + error.source + "\n" +
          "     " + red + message + none + "\n"
        );
      }.bind(this));
    }

    this.fetchResults();
  }.bind(this));
};

Runner.prototype.fetchResults = function() {
  this.browser.evaluate(this.getAdapterCodeFor("results"), function(error, results) {
    results = JSON.parse(results);

    var none    = this.color ? "\033[m" : "",
        color   = this.color ? (results.failed > 0 ? "\033[31m" : "\033[32m") : "",
        elapsed = (Date.now() - this.started) / 1000;

    console.log("Finished in " + elapsed + " seconds.");
    console.log(
      color +
      results.total  + " test"    + (results.total  != 1 ? "s" : "") + ", " +
      results.failed + " failure" + (results.failed != 1 ? "s" : "") +
      none);

    this.stop(results.failed > 0);
  }.bind(this));
};

// TODO: This should be replaced with a third-party library.
Runner.prototype.onRequest = function(request, response) {
  var url  = request.url,
      path = this.root + (url === "/" ? this.adapter.path : url);

  File.readFile(path, function(error, contents) {
    if (error) {
      response.writeHead(404, { "Content-Type" : "text/plain" });
      response.end("404 Not Found\n" + path);
    } else {
      var filter = this.filter,
          type   = {
            ".css"  : "text/css",
            ".html" : "text/html",
            ".js"   : "application/javascript"
          }[Path.extname(path)];

      if (filter && url === "/") {
        var source   = this.adapter.matcher.source,
            contents = contents.toString(),
            matcher  = new RegExp("<script src=\"" + source + "\"></script>", "gi"),
            scripts  = contents.match(matcher);

        scripts.forEach(function(script) {
          if (!filter.test(script)) {
            contents = contents.replace(script, "");
          }
        });
      }

      response.writeHead(200, { "Content-Type" : type });
      response.end(contents);
    }
  }.bind(this));
};

Runner.prototype.getAdapterCodeFor = function(method) {
  var code = this.adapter[method];

  if (code instanceof Function) {
    code = "(" + code + ")()";
  }

  return code;
};
