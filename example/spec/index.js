var Path = require("path"),
    Oink = require("../../");

new Oink.Runner({
  root    : Path.resolve(__dirname, ".."),
  adapter : Oink.Adapter.Jasmine
}).run();
