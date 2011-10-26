(function() {
  module("Player");

  var player = new Player(),
      song   = new Song();

  test("should be able to play a Song", function() {
    player.play(song);

    expect(2);
    ok(player.isPlaying, true);
    equal(player.currentlyPlayingSong, song);
  });

  test("tells the current song if the user has made it a favorite", function() {
    sinon.stub(song, "persistFavoriteStatus");

    player.play(song);
    player.makeFavorite();

    expect(1);
    ok(song.persistFavoriteStatus.calledWith(true));

    song.persistFavoriteStatus.restore();
  });


  module("Player, when song has been paused");

  test("should indicate that the song is currently paused", function() {
    player.play(song);
    player.pause();

    expect(1);
    equal(player.isPlaying, false);
  });

  test("should be possible to resume", function() {
    player.play(song);
    player.pause();
    player.resume();

    expect(2);
    ok(player.isPlaying, true);
    equal(player.currentlyPlayingSong, song);
  });


  module("Player#resume");

  test("should throw an exception if song is already playing", function() {
    player.play(song);

    raises(function() {
      player.resume();
    }, "Song is already playing.");
  });


  module("Player#skip");

  test("should throw an exception to demonstrate error reporting", function() {
    player.skip();
  });
})();
