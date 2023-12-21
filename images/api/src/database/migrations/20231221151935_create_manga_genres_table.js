/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
    return knex.schema.createTable('manga_genres', (table) => {
        table.increments('id').primary(); // Primary key
        table.integer('manga_id').unsigned().references('id').inTable('manga').onDelete('CASCADE');
        table.integer('genre_id').unsigned().references('id').inTable('genres').onDelete('CASCADE');
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('manga_genres');
};
