const { createSpotifyInstance } = require("../spotify-service");

const getListeningHistory = async (req, res) => {
  try {
    const { access_token } = req.user;
    const spotify = createSpotifyInstance(access_token);
    const response = await spotify.getMyRecentlyPlayedTracks({
      limit: 50,
    });
    //console.log(response);
    res.send({
      response,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  getListeningHistory,
};
