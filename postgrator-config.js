require("dotenv").config();
const url = require("url");
console.log("url: ", url);

let host;
let port;
let database;
let username;
let password;

if (process.env.DATABASE_URL) {
  const dbUrl = url.parse(process.env.DATABASE_URL);
  host = dbUrl.hostname;
  port = dbUrl.port;
  database = dbUrl.pathname.replace(/^\//, "");
  [username, password] = dbUrl.auth.split(":");
}
console.log("host: ", host);
console.log("port: ", port);
console.log("database: ", database);
console.log("username: ", username);
console.log("password: ", password);

module.exports = {
  migrationDirectory: "migrations",
  driver: "pg",
  host,
  port,
  database,
  username,
  password,
  ssl: {
    rejectUnauthorized: false,
  },
};
