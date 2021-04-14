const db = require("../services/knex");

const SpotifyService = {
  getAllUsers() {
    return db.select("*").from("spotify_users");
  },
  getAllPlaylists() {
    return db.select("*").from("playlists");
  },
  getAllTracks() {
    return db.select("*").from("tracks");
  },
  getAllPlaylistTracks() {
    return db.select("*").from("playlist_tracks");
  },
  getAllAudioAnalysis() {
    return db.select("*").from("audio_analysis");
  },
  getAllListeningHistory() {
    return db.select("*").from("listening_history");
  },
  insertTracks(data) {
    return db("tracks").insert(data);
  },
  insertPlaylists(data) {
    return db("playlists").insert(data);
  },

  insertPlaylistTracks(data) {
    return db("playlist_tracks").insert(data);
  },
  getTracks({ field, query }) {
    console.log("getting tracks", field, query);
    // return db("tracks").where(field, "like", `%${query}%`);
    return db("tracks").whereRaw(
      `LOWER(${field}) LIKE '%' || LOWER(?) || '%' `,
      query
    );
  },
  deleteUserSyncData(spotify_user) {
    return Promise.all([
      db("tracks").where("spotify_user", spotify_user).del(),
      db("playlists").where("spotify_user", spotify_user).del(),
      db("playlist_tracks").where("spotify_user", spotify_user).del(),
    ]);
  },
  insert() {
    /*
    spotify_user,
    track_name,
    track_id,
    track_href,
    track_uri,
    track_url,
    artist,
    album,
    release_date
    */
    return db("tracks").insert([
      /*  { spotify_user: spotify_user },
      { track_name: track_name },
      { track_id: track_id },
      { track_href: track_href },
      { track_uri: track_uri },
      { track_url: track_url },
      { artist: artist },
      { album: album },
      { release_date: release_date },
    */
    ]);
  },
  /*getById(db, id) {
      return db.select("*").from("tbd").where("id", id).first();
    },*/
};

module.exports = SpotifyService;
