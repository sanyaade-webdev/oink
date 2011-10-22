var Player = function() {
};

Player.prototype.play = function(song) {
  this.isPlaying            = true;
  this.currentlyPlayingSong = song;
};

Player.prototype.pause = function() {
  this.isPlaying = false;
};

Player.prototype.resume = function() {
  if (this.isPlaying) {
    throw new Error("Song is already playing.");
  }

  this.isPlaying = true;
};

Player.prototype.makeFavorite = function() {
  this.currentlyPlayingSong.persistFavoriteStatus(true);
};
