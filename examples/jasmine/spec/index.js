var Path = require("path"),
    Oink = require("../../../");

new Oink.Runner({
  root    : Path.resolve(__dirname, ".."),
  color   : true,
  adapter : Oink.Adapter.Jasmine
}).run();
