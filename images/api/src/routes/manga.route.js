const express = require("express");
const router = express.Router();
const db = require("../database/connect_database");


/**
 * Retrieve all manga.
 *
 * @route GET /api/mangas
 * @returns {array} - An array of all manga.
 * @throws {object} - Returns a 500 Internal Server Error if the retrieval fails.
 */
router.get('/', async (req, res) => {
    try {
      const mangas = await db('manga')
      res.status(200).send(mangas)
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "Something went wrong",
        value: error
      });
    }
});

/**
 * Retrieve manga sorted by created date and time.
 *
 * @route GET /api/mangas/createdAt
 * @param {string} -  manga database get orderBy creation time
 * @returns {array} - An array of all manga.
 * @throws {object} - Returns a 500 Internal Server Error if the retrieval fails.
 */

router.get('/createdAt', async (req, res) => {
  try {
    const mangas = await db('manga').orderBy('manga.created_at', 'desc'); 

    res.status(200).send(mangas);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: 'Something went wrong',
      value: error
    });
  }
});

/**
 * Retrieve all favorite manga.
 *
 * @route GET /api/mangas/favorites
 * @returns {array} - An array of all favorite manga.
 * @throws {object} - Returns a 500 Internal Server Error if the retrieval fails.
 */
router.get('/favorites', async (req, res) => {
  try {
    const mangas = await db('manga').select('*').where('favorite', true)
    res.status(200).send(mangas)
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Something went wrong",
      value: error
    });
  }
});

/**
 * Retrieve all read manga.
 *
 * @route GET /api/mangas/read
 * @returns {array} - An array of all read manga.
 * @throws {object} - Returns a 500 Internal Server Error if the retrieval fails.
 */
router.get('/read', async (req, res) => {
  try {
    const mangas = await db('manga').select('*').where('read', true)
    res.status(200).send(mangas)
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Something went wrong",
      value: error
    });
  }
});


/**
 * Retrieve manga by id.
 *
 * @route GET /api/mangas/:id
 * @param {string} -  req.params.id - The id of the manga to retrieve
 * @returns {array} - An array of all manga.
 * @throws {object} - Returns a 500 Internal Server Error if the retrieval fails.
 */
router.get('/:id', async (req, res) => {
  const mangaId = req.params.id;
  try {
    const manga = await db('manga').where('id', mangaId).first();

    if(!manga) {
      return res.status(404).send({
        error: "Manga not found",
      });
    }

    res.status(200).send(manga)
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: "Something went wrong",
      value: error
    });
  }
  
});

/**
 * Retrieve manga by id.
 *
 * @route GET /api/mangas/genre/:genreName
 * @param {string} -  req.params - The name of the manga genre to retrieve
 * @returns {array} - An array of all manga.
 * @throws {object} - Returns a 500 Internal Server Error if the retrieval fails.
 */
router.get('/genre/:genreName', async (req, res ) => {

  const genreName = req.params;

  try {
    // Big help from Rhys Devalckeneer on this bit of code
    const getMangaByGenre = await db('manga').select(['manga.id' ,'manga.title', "genres.name AS genreName", "manga.read", "manga.author", "manga.nrOfVolumes", "manga.cover", "manga.favorite", "manga.created_at", "manga.updated_at"])
    .join('manga_genres', 'manga.id', 'manga_genres.manga_id')
    .join('genres', 'manga_genres.genre_id', 'genres.id')
    .where('genres.name', genreName.genreName);

    res.status(200).send(getMangaByGenre);
    console.log()
    
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: "Something went wrong",
      value: error
    });
  }

})


/**
 * Create a new manga.
 *
 * @route POST /api/mangas
 * @param {object} req.body - The manga data to be created.
 * @returns {object} - The newly created manga.
 * @throws {object} - Returns a 500 Internal Server Error if the creation fails.
 */
router.post('/', async (req, res) => {
  const { id, title, author, cover, nrOfVolumes, read, favorite, created_at, updated_at } = req.body;

  try {
    await db('manga').insert({
      id,
      title,
      author,
      cover,
      nrOfVolumes,
      read,
      favorite,
      created_at,
      updated_at
    });

    // Fetch the last inserted record from the database based on insertion time
    const insertedRecord = await db('manga')
      .orderBy('manga.created_at', 'desc') // Assuming created_at represents insertion time
      .first();

    if (!insertedRecord) {
      throw new Error('Failed to retrieve last inserted record');
    }

    res.status(201).send({
      data: insertedRecord,
      message: 'Manga created successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: 'Something went wrong'
    });
  }
});

/**
 * Delete a manga by ID.
 *
 * @route DELETE /api/mangas/:id
 * @param {string} req.params.id - The ID of the movie to delete.
 * @returns {string} - A success message.
 * @throws {object} - Returns a 500 Internal Server Error if the deletion fails.
 */
router.delete('/:id', async (req, res) => {
  const mangaId = req.params.id;

  try {
      const deleteCount = await db('manga').where('id', mangaId).del();

      if (deleteCount === 0) {
          return res.status(404).send({ error: 'Manga not found' });
      }

      res.status(200).send({ message: 'Manga deleted successfully' });
  } catch (error) {
      console.error(error);

      res.status(500).send({
          error: 'Something went wrong',
          value: error,
      });
  }
});


/**
 * Update a manga by ID.
 *
 * @route PUT /api/mangas/:id
 * @param {string} req.params.id - The ID of the manga to update.
 * @param {object} req.body - The updated movie manga.
 * @returns {string} - A success message.
 * @throws {object} - Returns a 500 Internal Server Error if the update fails.
 */
router.patch('/:id', async (req, res) => {
  const mangaId = req.params.id;
  const { title, author, cover, nrOfVolumes, read, favorite } = req.body;

  try {
      const updateCount = await db('manga')
          .where('id', mangaId)
          .update({
            title,
            author,
            cover,
            nrOfVolumes,
            read,
            favorite
          });

      if (updateCount === 0) {
          return res.status(404).send({ error: 'Manga not found' });
      }

      res.status(200).send({ message: 'Manga updated successfully' });
  } catch (error) {
      console.error(error);

      res.status(500).send({
          error: 'Something went wrong',
          value: error,
      });
  }
});


/**
 * Create a new manga.
 *
 * @route POST /api/mangas/attrGenre
 * @param {object} req.body - The manga id and an array of all genres id.
 * @returns {object} - Attribute each genre to said manga.
 * @throws {object} - Returns a 500 Internal Server Error if the creation fails.
 */
router.post('/attrGenre', async (req, res) => {
  const { mangaId, genres } = req.body;

  try {
    // Check if the manga exists
    const mangaExists = await db('manga').where('id', mangaId).first();
    if (!mangaExists) {
      return res.status(404).send({
        error: 'Manga not found',
        message: 'The provided manga ID does not exist'
      });
    }

    // Associate genres with the manga in the book_genres table
    const mangaGenres = genres.map(genreId => ({ manga_id: mangaId, genre_id: genreId }));
    await db('manga_genres').insert(mangaGenres);

    res.status(201).send({
      data: { mangaId, genres },
      message: 'Genres associated with manga successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: 'Something went wrong',
      value: error
    });
  }
});


/**
 * Retrieve manga by genre.
 *
 * @route GET /api/mangas/genres/:id
 * @param {string} -  req.params.manga_id - The id in manga_id
 * @returns {array} - An array of all manga with said genre attributed to manga_id.
 * @throws {object} - Returns a 500 Internal Server Error if the retrieval fails.
 */
router.get('/genres/:manga_id', async (req, res) => {
  const mangaId = req.params.manga_id;
  try {
    const genres = await db('manga_genres')
      .where('manga_id', mangaId)
      .join('genres', 'manga_genres.genre_id', 'genres.id')
      .select('genres.id', 'genres.name');

    if (genres.length === 0) {
      return res.status(404).send({
        error: "Genres not found for this manga",
      });
    }

    res.status(200).send(genres);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Something went wrong",
      value: error
    });
  }
});


module.exports = router;
