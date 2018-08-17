import * as Knex from "knex";
import * as Objection from "objection";

const knexConfig = require("../knexfile");

export function connect(config: Knex.Config = null): Knex {
    const connection = Knex(config || knexConfig[process.env.NODE_ENV]);
    Objection.Model.knex(connection);
    console.log("KNEX: Database Connected");
    return connection;
}

export async function connectAndMigrate(): Promise<Knex> {
    const connection = connect();
    await connection.migrate.latest();
    //await connection.seed.run();
    console.log("KNEX: Database Migrated");
    return connection;
}

export async function truncateTables(): Promise<Knex> {
    const connection = connect();
    await connection.raw(`TRUNCATE entries, categories, accounts, users;`);
    return connection;
}
