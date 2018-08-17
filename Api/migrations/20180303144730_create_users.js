
exports.up = function (knex, Promise) {
  return knex.schema.createTable("users", (t) => {
    t.increments('id').primary();
    t.string('email').notNullable().uni;
    t.string('password').notNullable();
    t.string('name');
    t.number('age');
    t.string('city');
    t.timestamps(false, true);
    t.unique('email');
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
