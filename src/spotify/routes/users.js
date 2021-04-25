const usersRouter = require("express").Router();
const {
  createSyncUser,
  exportData,
} = require("../controllers/users_controller");

const serializeUser = (user) => ({
  id: user.id,
  spotify_user: xss(user.spotify_user),
});

usersRouter.get("/all", (req, res) => {
  res.send("ok");
});

usersRouter.put("/", createSyncUser);

usersRouter.get("/export-data/:user_id", exportData);

module.exports = usersRouter;
