var Path = require("path"),
    Oink = require("../../../");

new Oink.Runner({
  root    : Path.resolve(__dirname, ".."),
  color   : true,
  filter  : process.argv[2],
  adapter : Oink.Adapter.Mocha
}).run();
