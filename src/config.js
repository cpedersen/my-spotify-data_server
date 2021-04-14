require("dotenv").config();
const path = require("path");

const CLIENT_ORIGIN =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_ORIGIN
    : process.env.CLIENT_ORIGIN_LOCAL;

const DATABASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL_LOCAL;

const PORT = process.env.PORT || 8000;

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_ORIGIN: CLIENT_ORIGIN,
  DATABASE_URL,
};
