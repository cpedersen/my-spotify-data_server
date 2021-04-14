const usersRouter = require("express").Router();

const serializeUser = (user) => ({
  id: user.id,
  spotify_user: xss(user.spotify_user),
});

// /api/users/all
usersRouter.get("/all", (req, res) => {
  res.send("ok");
});

// /api/users/52341
usersRouter.get("/:user_id", (req, res) => {
  res.send("ok");
});

module.exports = usersRouter;
