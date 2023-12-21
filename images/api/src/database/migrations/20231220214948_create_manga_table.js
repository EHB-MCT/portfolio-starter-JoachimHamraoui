/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
    return knex.schema.createTable('manga', (table) => {
        table.increments('id').primary(); // Primary key
        table.string('title').notNullable();
        table.string('author').notNullable();
        table.string('cover').notNullable();
        table.integer('nrOfVolumes').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('manga');
};
