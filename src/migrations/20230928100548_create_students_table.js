exports.up = function (knex) {
    return knex.schema.createTable('students', (table) => {
      table.increments('id').primary();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.integer('age').notNullable();
      table.string('email').unique().notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('students');
  };
  