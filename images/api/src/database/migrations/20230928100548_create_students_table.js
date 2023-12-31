/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
    return knex.schema.createTable('students', (table) => {
      table.increments('id').primary();
      table.uuid('UUID');
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.integer('age').notNullable();
      table.string('email').unique().notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };

  /**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
  exports.down = function (knex) {
    return knex.schema.dropTable('students');
  };
  