const spotifyModel = require("../spotify-model");
const { handleTracksSync } = require("./tracks_controller");
const { createSpotifyInstance } = require("../spotify-service");
const createSyncUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const { access_token } = req.user;
    console.log("in create sync", userId, req.body, req.user);
    const spotify = createSpotifyInstance();
    const user = await spotifyModel.getUser(userId);
    console.log(user);

    if (user.length) {
      res.send({
        message: "User already exists.",
      });
      return;
    }

    await spotifyModel.createUser(userId);
    const { result, preparedData } = await handleTracksSync(
      spotify,
      access_token,
      userId
    );
    console.log({ result, preparedData });
    res.send({
      data: {
        result,
        preparedData,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: error.message,
    });
  }
};

const exportData = async (req, res) => {
  try {
    const { user_id } = req.params;
    console.log("export", req.params);
    const data = await spotifyModel.getExportData(user_id);

    res.send({
      rows: data.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createSyncUser,
  exportData,
};
