const { default: knex } = require("knex");
const db = require("../services/knex");

const SpotifyService = {
  getAllUsers() {
    return db.select("*").from("spotify_users");
  },
  getUser(id) {
    return db.select("*").from("spotify_users").where("spotify_user", id);
  },
  createUser(spotify_user) {
    return db("spotify_users").insert({
      spotify_user,
    });
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
    //console.log({ data });
    return db("playlists").insert(data);
  },
  insertPlaylistTracks(data) {
    return db("playlist_tracks").insert(data);
  },
  insertListeningHistory(data) {
    return db("listening_history").insert(data);
  },
  insertAudioAnalysis(data) {
    return db("audio_analysis").insert(data);
  },
  getExportData(userId) {
    return db.raw(
      `select track_name, playlist_name 
      from playlists join tracks 
      on playlists.playlist_id = tracks.playlist_id 
      where playlists.spotify_user = ? 
      order by tracks.track_name ASC;`,
      [userId]
    );
  },
  getTracks({ field, query, spotify_user }) {
    return db.raw(
      `
      select tracks.id, track_name, tracks.track_id, track_href, track_uri, tracks.external_url, artist, album, playlists.playlist_name
      from tracks      
      left join playlists
      on tracks.playlist_id = playlists.playlist_id
      where tracks.spotify_user = :spotify_user
      and LOWER(tracks.${field}) like '%' || LOWER(:query) || '%'
    `,
      { spotify_user, query }
    );
  },
  // TODO - Post bootcamp I will be implementing a purge DB option
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
