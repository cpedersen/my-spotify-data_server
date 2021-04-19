// TODO: Remove this file and use only server.js, which is required for Heroku

const knex = require("knex");
const { DATABASE_URL } = require("../config");

const db = knex({
  client: "pg",
  connection: DATABASE_URL,
  // On Heroku, set the following config var (https://help.heroku.com/966620):
  // PGSSLMODE: no-verify
});

module.exports = db;
