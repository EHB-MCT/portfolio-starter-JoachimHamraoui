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


router.get('/genre/:genreName', async (req, res ) => {

  const genreName = req.params;

  try {
    // Big help from Rhys Devalckeneer on this bit of code
    const getMangaByGenre = await db('manga').select(['manga.title', "genres.name AS genreName", "manga.read", "manga.author", "manga.nrOfVolumes", "manga.cover", "manga.favorite", "manga.created_at", "manga.updated_at"])
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
  const { id, title, author, cover, nrOfVolumes,read, favorite, created_at, updated_at } = req.body;

  try {
    const insertedRecord = await db('manga')
      .insert({
        id,
        title,
        author,
        cover,
        nrOfVolumes,
        read,
        favorite,
        created_at,
        updated_at
      })

    res.status(201).send({
      data: insertedRecord, // Send the inserted ID back in the response
      message: 'Manga created successfully'
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: 'Something went wrong',
      value: error
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
router.put('/:id', async (req, res) => {
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


module.exports = router;
