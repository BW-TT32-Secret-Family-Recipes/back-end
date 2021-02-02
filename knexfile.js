const pg = require("pg");
const localConnection = "postgresql://localhost/recipes";

let connection;

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false };
  connection = process.env.DATABASE_URL;
} else {
  connection = localConnection;
}

const sharedConfig = {
  client: "pg",
  connection,
  migrations: { directory: "./data/migrations" },
  seeds: { directory: "./data/seeds" }
}

module.exports = {
  development: { ...sharedConfig },
  production: {
    ...sharedConfig,
    pool: { min: 2, max: 10 }
  },

  test: {
    client: "sqlite3",
    useNullAsDefault: true,
    pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) },
    migrations: { directory: "./data/migrations" },
    seeds: { directory: "./data/seeds" },
    connection: {
      filename: "./data/test.db3",
    }
  }

};
