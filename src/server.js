const knex = require("knex");
const app = require("./app");
const { PORT, DATABASE_URL, TEST_DATABASE_URL } = require("./config");

const db = knex({
  client: "pg",
  connection:
    process.env.NODE_ENV === "development" ? DATABASE_URL : TEST_DATABASE_URL,
});

app.set("db", db);

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
