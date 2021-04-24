const audioAnalysisRouter = require("express").Router();

// const serializeAudioAnalysis = (track) => ({
//   id: track.id,
//   spotify_user: xss(track.track_id),
//   track_id: xss(track.track_id),
//   spotify_user: xss(track.spotify_user),
//   analysis_url: xss(track.analysis_url),
//   acousticness: xss(track.acousticness),
//   danceability: xss(track.danceability),
//   duration_ms: xss(track.duration_ms),
//   energy: xss(track.energy),
//   explictness: xss(track.explictness),
//   instrumentalness: xss(track.instrumentalness),
//   track_key: xss(track.track_key),
//   liveness: xss(track.liveness),
//   loudness: xss(track.loudness),
//   mode: xss(track.mode),
//   popularity: xss(track.popularity),
//   release_year: xss(track.release_year),
//   speechiness: xss(track.speechiness),
//   tempo: xss(track.tempo),
//   time_signature: xss(track.time_signature),
//   valence: xss(track.valence),
// });

// // /api/audio_analysis/all
// audioAnalysisRouter.get("/all", (req, res) => {
//   res.send("ok");
// });

// // /api/audio_analysis/52341
// audioAnalysisRouter.get("/:track_id", (req, res) => {
//   res.send("ok");
// });

module.exports = audioAnalysisRouter;
