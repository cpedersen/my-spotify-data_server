const tracksRouter = require("express").Router();
const { syncTracks, getTracks } = require("../controllers/tracks_controller");
// const serializeTrack = (track) => ({
//   id: track.id,
//   spotify_user: xss(track.spotify_user),
//   track_name: xss(track.track_name),
//   track_id: xss(track.track_id),
//   track_href: xss(track.track_href),
//   track_uri: xss(track.track_uri),
//   track_url: xss(track.track_url),
//   artist: xss(track.artist),
//   album: xss(track.album),
//   release_date: xss(track.release_date),
// });

// /api/tracks/
tracksRouter.get("/", getTracks);

// /api/tracks/52341
// tracksRouter.get("/:track_id", (req, res) => {
//   res.send("ok");
// });
tracksRouter.post("/sync", syncTracks);

module.exports = tracksRouter;
