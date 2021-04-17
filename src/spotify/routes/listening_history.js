const listeningHistoryRouter = require("express").Router();
const {
  getListeningHistory,
} = require("../controllers/listening_history_controller");
const serializeListeningHistory = (user) => ({
  id: user.id,
  spotify_user: xss(user.spotify_user),
  played_at: xss(user.played_at),
  track_name: xss(user.track_name),
  track_id: xss(user.track_id),
  track_href: xss(user.track_href),
  track_uri: xss(user.track_uri),
  track_url: xss(user.track_url),
  artist: xss(user.artist),
  album: xss(user.album),
});

// /api/history/all
listeningHistoryRouter.get("/all", (req, res) => {
  res.send("ok");
});

// /api/history/52341
listeningHistoryRouter.get("/:user_id", getListeningHistory);

module.exports = listeningHistoryRouter;
