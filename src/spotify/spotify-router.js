const path = require("path");
const express = require("express");
const xss = require("xss");
const SpotifyService = require("./spotify-model");
const spotifyRouter = express.Router();
const jsonParser = express.json();

const users = require("./routes/users");
const tracks = require("./routes/tracks");
const playlists = require("./routes/playlists");
const audio_analysis = require("./routes/audio_analysis");
const listening_history = require("./routes/listening_history");

spotifyRouter.use("/users", users);
spotifyRouter.use("/tracks", tracks);
spotifyRouter.use("/playlists", playlists);
spotifyRouter.use("/audio_analysis", audio_analysis);
spotifyRouter.use("/listening_history", listening_history);

module.exports = spotifyRouter;
