const { expect } = require("chai").expect;
const supertest = require("supertest");
const app = require("../src/app");
const knex = require("knex");
const spotifyModel = require("../src/spotify/spotify-model");
const { TEST_DATABASE_URL } = require("../src/config.js");
const {
  makeSpotifyArray_spotifyUsers,
  makeSpotifyArray_tracks,
  makeSpotifyArray_playlists,
  makeSpotifyArray_playlistTracks,
  makeSpotifyArray_listeningHistory,
  makeSpotifyArray_audioAnalysis,
} = require("./spotify.fixtures");

describe("App", () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app).get("/").expect(200, "Hello, world!");
  });
});

describe("Spotify Database", function () {
  /*before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: TEST_DATABASE_URL,
    });
    app.set("db", db);
  });*/

  let db;

  before("Connect to DB and then clean out all test tables", async () => {
    console.log("TEST_DATABASE_URL: ", TEST_DATABASE_URL);
    db = knex({
      client: "pg",
      connection: TEST_DATABASE_URL,
    });
    app.set("db", db);

    await db("spotify_users").truncate();
    await db("tracks").truncate();
    await db("playlists").truncate();
    await db("playlist_tracks").truncate();
    console.log("DB tables are cleaned out");
  });

  //before("clean out the tracks table", () => db("tracks").truncate());
  /*before("clean out the playlists table", () => {
    console.error('trucate playlists');
    db("playlists").truncate()
  });*/
  /*before("clean out the playlist_tracks table", () =>
    db("playlist_tracks").truncate()
  );*/
  /*before("clean out the listening_history table", () =>
    db("listening_history").truncate()
  );*/
  /*before("clean out the audio_analysis table", () =>
    db("audio_analysis").truncate()
  );*/

  //context("Given there are entries in the database", () => {
  //const userData = makeSpotifyArray_spotifyUsers();
  //console.log("userData: ", userData);
  //const songData = makeSpotifyArray_tracks();
  //console.log("songData: ", songData);
  //const playlistData = makeSpotifyArray_playlists();
  //const playlistTracksData = makeSpotifyArray_playlistTracks();
  //const listeningHistoryData = makeSpotifyArray_listeningHistory();
  //const audioAnalysisData = makeSpotifyArray_audioAnalysis();*/

  before("insert spotify_users data", async () => {
    //return spotifyModel.createUser(userData);
    console.log("inserting spotify_users data");
    return await db("spotify_users").insert({
      id: 1,
      spotify_user: "Dunder Mifflin",
    });
  });

  before("insert tracks data", async () => {
    //return spotifyModel.insertTracks(songData);
    console.log("inserting tracks data");
    return await db("tracks").insert({
      id: 1,
      spotify_user: "Dunder Mifflin",
      track_name: "Best of You",
      track_id: "5FZxsHWIvUsmSK1IAvm2pp",
      track_href: "https://api.spotify.com/v1/tracks/5FZxsHWIvUsmSK1IAvm2pp",
      track_uri: "spotify:track:5FZxsHWIvUsmSK1IAvm2pp",
      external_url: "https://open.spotify.com/track/5FZxsHWIvUsmSK1IAvm2pp",
      artist: "Foo Fighters",
      album: "In Your Honor",
      release_date: "2017-03-17 18:50:51.191353-07",
    });
  });

  before("insert playlists data", async () => {
    //return spotifyModel.insertPlaylists(playlistData);
    console.log("inserting playlists data");
    return await db("playlists").insert({
      id: 1,
      spotify_user: "Dunder Mifflin",
      playlist_name: "Foo Fighters",
      playlist_id: "58OeUrx5150jMwaN8O8PrA",
      playlist_href:
        "https://api.spotify.com/v1/playlists/58OeUrx5150jMwaN8O8PrA",
      playlist_uri: "spotify:playlist:58OeUrx5150jMwaN8O8PrA",
      external_url: "https://open.spotify.com/playlist/58OeUrx5150jMwaN8O8PrA",
      added_at: "2021-04-18",
      total_tracks: "6",
    });
  });

  before("insert playlist_tracks data", async () => {
    //return spotifyModel.insertPlaylistTracks(playlistTracksData);
    console.log("inserting playlist_tacks data");
    return await db("playlist_tracks").insert({
      id: 1,
      track_id: "5FZxsHWIvUsmSK1IAvm2pp",
      spotify_user: "Dunder Mifflin",
      playlist_id: "58OeUrx5150jMwaN8O8PrA",
      added_at: "2021-04-18",
    });
  });

  /* TODO: To post appending of listening history in
       the database in the future
    /*
    before("insert listening_history data", () => {
      return spotifyModel.insertListeningHistory(listeningHistoryData);
    });
    */

  /* TODO: To implement audio_analysis in the future
    /*
    before("insert audio_analysis data", () => {
      return spotifyModel.insertAudioAnalysis(audioAnalysisData);
    });
    */

  // TODO - /users/all should be just /users in main code
  it("GET /api/users responds with 200 for user data", async () => {
    return supertest(app)
      .get("/api/users/all")
      .expect(200)
      .then((response) => {
        console.log("response.body check to go here");
        //expect(response.body).to.have.to.have.all.keys("id", "spotify_user");
        //expect(response.body.spotify_user).to.equal("Dunder Mifflin");
      });
  });

  it("GET /api/tracks responds with 200 for tracks data", async () => {
    return supertest(app)
      .get("/api/tracks")
      .expect(200)
      .then((response) => {
        console.log("response.body check to go here");
        /*expect(response.body).to.have.to.have.all.keys(
            "id",
            "spotify_user",
            "track_name",
            "track_id",
            "track_href",
            "track_uri",
            "external_url",
            "artist",
            "album",
            "release_date"
          );
          expect(response.body.track_name).to.equal("Best of You");*/
      });
  });

  it("GET /api/playlists responds with 200 for playlists data", async () => {
    return supertest(app)
      .get("/api/playlists/all")
      .expect(200)
      .then((response) => {
        console.log("response.body check to go here");
        /*expect(response.body).to.have.to.have.all.keys(
            "id",
            "spotify_user",
            "playlist_name",
            "playlist_id",
            "playlist_href",
            "playlist_uri",
            "external_url",
            "added_at",
            "total_tracks"
          );
          expect(response.body.playlist_name).to.equal("Foo Fighters");*/
      });
  });

  it("GET /api/playlist_tracks responds with 200 for playlist_tracks data", async () => {
    return supertest(app)
      .get("/api/playlist_tracks/all")
      .expect(200)
      .then((response) => {
        console.log("response.body check to go here");
        /*expect(response.body).to.have.to.have.all.keys(
            "id",
            "spotify_user",
            "track_id",
            "playlist_id",
            "added_at"
          );
          expect(response.body.playlist_name).to.equal("Foo Fighters");*/
      });
  });

  /*
    it("GET /api/listening_history responds with 200 for listening_history data", () => {
      return supertest(app).get("/api/listening_history").expect(200);
    });
    */

  /*
    it("GET /api/audio_analysis responds with 200 for audio_analysis data", () => {
      return supertest(app).get("/api/audio_analysis").expect(200);
    });
    */

  after("clean out the spotify_users table", async () => {
    await db("spotify_users").truncate();
    await db("tracks").truncate();
    await db("playlists").truncate();

    await db("playlist_tracks").truncate();
  });

  /*
    after("clean out the listening_history table", () =>
      db("listening_history").truncate()
    );
    after("clean out the audio_analysis table", () =>
      db("audio_analysis").truncate()
    );
    */

  after("disconnect from db", async () => await db.destroy());
  //});
});
