const spotifyModel = require("../spotify-model");
const { createSpotifyInstance } = require("../spotify-service");
const withAsync = require("../../helpers/withAsync");
const fetch = require("node-fetch");

const fetchPlaylistItems = async ({
  playlistId,
  data,
  access_token,
  config = {
    limit: 100,
    offset: 0,
  },
}) => {
  const { limit, offset } = config;
  // Make a request to fetch playlist items
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=US&limit=${limit}&offset=${offset}`,
    {
      method: "get",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const responseBody = await response.json();
  const { items, next } = responseBody;
  // On the first call, there is no data, so set it up
  if (!data) {
    data = {
      id: playlistId,
      tracks: items,
    };
  } else {
    // On further calls, we already have data, so we need to
    // concatenate previously fetched tracks with new ones
    data.tracks = [...data.tracks, ...items];
  }
  // If there is more data to fetch, then call fetchPlaylist recursively
  if (next) {
    return fetchPlaylistItems({
      playlistId,
      data,
      access_token,
      config: {
        limit,
        offset: limit + offset,
      },
    });
  } else {
    // There is no more data to fetch, so return what we gathered
    return data;
  }
};

const fetchTracksForPlaylists = async (spotify, playlists) => {
  const { response, error } = await withAsync(() =>
    Promise.all(
      playlists.map((playlist) =>
        fetchPlaylistItems({
          playlistId: playlist.id,
          playlistName: playlist.name,
          access_token: spotify.getAccessToken(),
        })
      )
    )
  );
  console.log({ response, error });

  /*
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
    .flat();*/

  const tracks = response
    .map((body) => {
      const { playlistId, playlistName, tracks } = body;
      return tracks.map((item) => {
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

const fetchUserPlaylists = async (spotify, userId) => {
  const { response, error } = await withAsync(() =>
    spotify.getUserPlaylists(userId, {
      limit: 50,
    })
  );
  console.log({ response, error });
  const { items } = response.body;
  const data = await fetchTracksForPlaylists(spotify, items);
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

const handleTracksSync = async (spotify, access_token, userId) => {
  spotify.setAccessToken(access_token);
  const data = await fetchUserPlaylists(spotify, userId);
  const preparedData = prepareSyncData(data, userId);
  await spotifyModel.deleteUserSyncData(userId);
  const result = await insertSyncData(preparedData);
  return {
    preparedData,
    result,
  };
};

const syncTracks = async (req, res) => {
  try {
    console.log(req.headers);
    const spotify = createSpotifyInstance();
    const access_token = req.headers.authorization.slice(7);
    const { userId } = req.body;
    console.log({ access_token });
    const { result, preparedData } = await handleTracksSync(
      spotify,
      access_token,
      userId
    );
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
  handleTracksSync,
  fetchPlaylistItems,
};
