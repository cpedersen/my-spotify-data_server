const playlistsRouter = require("express").Router();
const { fetchPlaylist } = require("../controllers/tracks_controller");
const { createSpotifyInstance } = require("../spotify-service");

const serializePlaylist = (playlist) => ({
  id: playlist.id,
  spotify_user: xss(playlist.spotify_user),
  playlist_name: xss(playlist.playlist_name),
  playlist_id: xss(playlist.playlist_id),
  playlist_href: xss(playlist.playlist_href),
  playlist_uri: xss(playlist.playlist_uri),
  external_url: xss(playlist.external_url),
  added_at: xss(playlist.added_at),
  total_tracks: xss(playlist.total_tracks),
});

// /api/playlists/all
playlistsRouter.get("/all", (req, res) => {
  res.send("ok");
});

playlistsRouter.get("/test", async (req, res) => {
  const access_token =
    "BQA1Zn_lsPViRLpOs4Qi4YwEWLQ_eVu0I_zcmi2AgYkv5BtWkbkABwMMdgT7B2tQuSErvIgp91sZCcck828_JsnepG6PLcEK-O-tmlsgzUj5SuJ5ugrQuelLZYdKMHN8iMaBAaPmZTpL5--44O6kfC1oaQ-N78uXEvvbAKhI0ayPkVUCkYBnjicpXwI";
  const response = await fetchPlaylist({
    access_token,
    playlistId: "2Yib6d04SZuvP4ZMgUmXjM",
  });
  console.log({ response });
  console.log("Items num", response.tracks.length);
  res.send(response);
});

// /api/playlists/52341
playlistsRouter.get("/:playlist_id", (req, res) => {
  res.send("ok");
});

module.exports = playlistsRouter;
