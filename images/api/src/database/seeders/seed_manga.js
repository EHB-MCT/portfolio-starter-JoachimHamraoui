/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex('manga')
    .select("*")
    .then(function (d) {
      if(!d[0]) {
      // Inserts seed entries into the 'genres' table
      return knex('manga').insert([
        {
          title: 'Dragon Ball',
          author: 'Akira Toriyama',
          cover: 'https://m.media-amazon.com/images/I/91rUWaFxAYL._SL1500_.jpg',
          nrOfVolumes: 42
        },
        {
          title: 'Akira',
          author: 'Katsuhiro Otomo',
          cover: 'https://m.media-amazon.com/images/I/81Usu4G2iVL._SL1500_.jpg',
          nrOfVolumes: 6
        },
        {
          title: 'Slam Dunk',
          author: 'Takehiko Inoue',
          cover: 'https://m.media-amazon.com/images/I/81-O7vwk8DL._SL1500_.jpg',
          nrOfVolumes: 31
        },
        {
          title: 'Dorohedoro',
          author: 'Q Hayashida',
          cover: 'https://m.media-amazon.com/images/I/91KWy-q8ZOL._SL1500_.jpg',
          nrOfVolumes: 23
        },
        {
          title: 'Prisonnier Riku',
          author: 'Shinobu Seguchi',
          cover: 'https://m.media-amazon.com/images/I/71QSXqSj1IS._SL1257_.jpg',
          nrOfVolumes: 38
        },

      ]);
    };
    });
};
