const playlistTracksRouter = require("express").Router();

const serializePlaylistTrack = (playlist_track) => ({
  id: playlist_track.id,
  track_id: xss(playlist_track.track_id),
  playlist_id: xss(playlist_track.playlist_id),
  spotify_user: xss(playlist_track.spotify_user),
  added_at: xss(playlist_track.added_at),
});

// /api/tracks/all
playlistTracksRouter.get("/all", (req, res) => {
  res.send("ok");
});

// /api/tracks/52341
playlistTracksRouter.get("/:track_id", (req, res) => {
  res.send("ok");
});

module.exports = playlistTracksRouter;
