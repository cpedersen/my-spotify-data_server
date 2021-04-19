const usersRouter = require("express").Router();
const {
  createSyncUser,
  exportData,
} = require("../controllers/users_controller");

const serializeUser = (user) => ({
  id: user.id,
  spotify_user: xss(user.spotify_user),
});

// /api/users/all
usersRouter.get("/all", (req, res) => {
  res.send("ok");
});

/* TODO - Complete route
/*usersRouter
.route("/all")
.get((req, res) => {
  res.send("ok");
});
*/

// /api/users/52341
usersRouter.get("/:user_id", (req, res) => {
  res.send("ok");
});

usersRouter.put("/", createSyncUser);
usersRouter.get("/export-data/:user_id", exportData);

module.exports = usersRouter;
