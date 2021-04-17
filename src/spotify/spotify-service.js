const SpotifyWebApi = require("spotify-web-api-node");

const createSpotifyInstance = (access_token) => {
  const spotify = new SpotifyWebApi();
  if (access_token) spotify.setAccessToken(access_token);
  return spotify;
};

module.exports = {
  createSpotifyInstance,
};
