const playlistsRouter = require("express").Router();

// const serializePlaylist = (playlist) => ({
//   id: playlist.id,
//   spotify_user: xss(playlist.spotify_user),
//   playlist_name: xss(playlist.playlist_name),
//   playlist_id: xss(playlist.playlist_id),
//   playlist_href: xss(playlist.playlist_href),
//   playlist_uri: xss(playlist.playlist_uri),
//   external_url: xss(playlist.external_url),
//   added_at: xss(playlist.added_at),
//   total_tracks: xss(playlist.total_tracks),
// });

// /api/playlists/all
// playlistsRouter.get("/all", (req, res) => {
//   res.send("ok");
// });

// /api/playlists/52341
// playlistsRouter.get("/:playlist_id", (req, res) => {
//   res.send("ok");
// });

module.exports = playlistsRouter;
