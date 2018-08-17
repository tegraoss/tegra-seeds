require("dotenv").load();
console.log(process.env.DB_HOST);
// Update with your config settings.

module.exports = {
  test: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT_TEST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_TEST
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "admin_schema_version",
      directory: "./migrations"
    }
  },
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "admin_schema_version",
      directory: "./migrations"
    }
  }
};
