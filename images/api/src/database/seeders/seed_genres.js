/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  
  return knex('genres')
    .select("*")
    .then(function (d) {
      if(!d[0]) {
      // Inserts seed entries into the 'genres' table
      return knex('genres').insert([
        {
          name: 'Action'
        },
        {
          name: 'Delinquent'
        },
        {
          name: 'Horror'
        },
        {
          name: 'Romance'
        },
        {
          name: 'Fantasy'
        },
        {
          name: 'Adventure'
        },
        {
          name: 'Sport'
        },
        {
          name: 'Martial Arts'
        },
        {
          name: 'Slice of Life'
        },
        {
          name: 'School Life'
        },
        {
          name: 'Thriller'
        },
        {
          name: 'Sci-fi'
        },
        {
          name: 'History'
        },
        {
          name: 'War'
        },
        {
          name: 'Prison Life'
        },
        {
          name: 'Social'
        },
        {
          name: 'Comedy'
        },
        {
          name: 'Gekiga'
        },
        {
          name: 'Biography'
        },
        {
          name: 'Crime'
        }
        
        // Add more genres here
      ]);
    };
    });

};
