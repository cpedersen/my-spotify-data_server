const knex = require("knex");
const app = require("./app");
//const { PORT, DATABASE_URL, TEST_DATABASE_URL } = require("./config");
const { PORT, DATABASE_URL } = require("./config");

const db = knex({
  client: "pg",
  connection: DATABASE_URL,
});

app.set("db", db);

app.listen(PORT, () => {
  //console.log(`Server listening at ${PORT}`);
  console.log(`Server listening at ${DATABASE_URL}:${PORT}`);
});
