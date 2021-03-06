describe("Player", function() {
  var player, song;

  beforeEach(function() {
    player = new Player();
    song = new Song();
  });

  it("should be able to play a Song", function() {
    player.play(song);
    expect(player.currentlyPlayingSong).to.equal(song);
    expect(player.isPlaying).to.be.ok();
  });

  describe("when song has been paused", function() {
    beforeEach(function() {
      player.play(song);
      player.pause();
    });

    it("should indicate that the song is currently paused", function() {
      expect(player.isPlaying).to.not.be.ok();
    });

    it("should be possible to resume", function() {
      player.resume();
      expect(player.isPlaying).to.be.ok();
      expect(player.currentlyPlayingSong).to.equal(song);
    });
  });

  describe("#resume", function() {
    it("should throw an exception if song is already playing", function() {
      player.play(song);

      expect(function() {
        player.resume();
      }).to.throwException("Song is already playing.");
    });
  });

  describe("#skip", function() {
    it("should throw an exception to demonstrate error reporting", function() {
      player.skip();
    });
  });
});
