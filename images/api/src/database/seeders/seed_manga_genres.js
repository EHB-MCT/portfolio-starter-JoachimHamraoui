/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  
  return knex('manga_genres')
    .select("*")
    .then(function (d) {
      if(!d[0]) {
      // Inserts seed entries into the 'genres' table
      return knex('manga_genres').insert([
        {
          manga_id: 1,
          genre_id: 1
        },
        {
          manga_id: 1,
          genre_id: 6
        },
        {
          manga_id: 1,
          genre_id: 8
        },
        {
          manga_id: 3,
          genre_id: 2
        },
        {
          manga_id: 3,
          genre_id: 7
        },
        {
          manga_id: 3,
          genre_id: 10
        }
        
        // Add more genres here
      ]);
    };
    });

};
