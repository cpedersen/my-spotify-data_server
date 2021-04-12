const SpotifyService = {
  getAllUsers(knex) {
    return knex.select("*").from("spotify_users");
  },
  getAllPlaylists(knex) {
    return knex.select("*").from("playlists");
  },
  getAllPlaylists(knex) {
    return knex.select("*").from("tracks");
  },
  getAllPlaylists(knex) {
    return knex.select("*").from("playlist_tracks");
  },
  getAllPlaylists(knex) {
    return knex.select("*").from("audio_analysis");
  },
  getAllPlaylists(knex) {
    return knex.select("*").from("listening_history");
  },
  /*getById(knex, id) {
      return knex.select("*").from("tbd").where("id", id).first();
    },*/
};

module.exports = SpotifyService;
