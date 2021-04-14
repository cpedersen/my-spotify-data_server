const spotifyModel = require("../spotify-model");
const { spotify } = require("../spotify-service");
const withAsync = require("../../helpers/withAsync");

const fetchTracksForPlaylists = async (playlists) => {
  const { response, error } = await withAsync(() =>
    Promise.all(
      playlists.map((playlist) =>
        spotify.getPlaylist(playlist.id, {
          limit: 500,
        })
      )
    )
  );
  console.log({ response, error });
  const tracks = response
    .map(({ body }) => {
      const { id: playlistId, name: playlistName, tracks } = body;
      const { items } = tracks;
      return items.map((item) => {
        item.playlistName = playlistName;
        item.playlistId = playlistId;
        return item;
      });
    })
    .flat();

  return {
    tracks,
    playlists,
  };
};

const fetchUserPlaylists = async (userId) => {
  const { response, error } = await withAsync(() =>
    spotify.getUserPlaylists(userId)
  );

  console.log({ response, error });
  const { items } = response.body;
  const data = await fetchTracksForPlaylists(items);
  return data;
};

const prepareSyncData = ({ tracks, playlists }, spotifyUserId) => {
  let playlistTracks = [];
  let preparedTracks = [];
  let preparedPlaylists = [];

  for (const playlist of playlists) {
    /*
        TODO: check how to get added_at/created for the playlist
      */
    const { id, name, href, tracks, uri, external_urls } = playlist;
    const total_tracks = tracks.total;
    preparedPlaylists.push({
      spotify_user: spotifyUserId,
      playlist_id: id,
      playlist_name: name,
      playlist_href: href,
      playlist_uri: uri,
      external_url: external_urls.spotify,
      added_at: new Date(),
      total_tracks,
    });
  }

  for (const item of tracks) {
    const { track, added_at, playlistId: playlist_id } = item;
    const {
      id: track_id,
      name: track_name,
      href: track_href,
      uri: track_uri,
      popularity,
      external_urls,
      /*
        TODO: Needs to support multiple artists
        */
      album,
      artists,
      release_date,
    } = track;

    playlistTracks.push({
      track_id,
      playlist_id,
      added_at,
      spotify_user: spotifyUserId,
    });

    preparedTracks.push({
      track_id,
      track_name,
      track_href,
      track_uri,
      external_url: external_urls.spotify,
      spotify_user: spotifyUserId,
      release_date,
      artist: artists[0]?.name || "",
      album: album.name,
      // popularity
    });
  }

  return {
    playlistTracks,
    preparedTracks,
    preparedPlaylists,
  };
};

const insertSyncData = async (data) => {
  const { playlistTracks, preparedTracks, preparedPlaylists } = data;
  console.log("check", { preparedTracks });
  return Promise.all([
    spotifyModel.insertTracks(preparedTracks),
    spotifyModel.insertPlaylists(preparedPlaylists),
    spotifyModel.insertPlaylistTracks(playlistTracks),
  ]);
};

const syncTracks = async (req, res) => {
  try {
    console.log(req.headers);
    const access_token = req.headers.authorization.slice(7);
    const { userId } = req.body;
    console.log({ access_token });
    spotify.setAccessToken(access_token);
    const data = await fetchUserPlaylists(userId);
    const preparedData = prepareSyncData(data, userId);
    await spotifyModel.deleteUserSyncData(userId);
    const result = await insertSyncData(preparedData);
    console.log(result);
    /*
      Prepare tracks
      Prepare playlists
      Prepare playlist_tracks association
    
      */
    res.json(preparedData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getTracks = async (req, res) => {
  const { query = "", searchBy = "title" } = req.query;
  if (searchBy && !["title", "spotify-url"].includes(searchBy)) {
    res.status(422).send({
      message: "Incorrect searchBy parameter specified",
    });
    return;
  }

  const searchByMap = {
    title: "track_name",
    "spotify-url": "external_url",
  };

  const field = searchByMap?.[searchBy] || searchByMap.title;
  const { response, error } = await withAsync(spotifyModel.getTracks, {
    query: query.toLowerCase(),
    field,
  });

  if (error) {
    console.error(error);
    res.status(500).send({
      message: error.message,
    });
    return;
  }

  res.send({
    data: response,
  });
};

module.exports = {
  syncTracks,
  getTracks,
};
