const tracksRouter = require("express").Router();
const { syncTracks, getTracks } = require("../controllers/tracks_controller");

tracksRouter.get("/", getTracks);

tracksRouter.post("/sync", syncTracks);

module.exports = tracksRouter;
