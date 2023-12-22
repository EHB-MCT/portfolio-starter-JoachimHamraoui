const express = require("express");
const router = express.Router();
const db = require("../database/connect_database");


/**
 * Retrieve all manga.
 *
 * @route GET /api/v1/manga
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


router.delete('/:id', async (req, res) => {
  const mangaId = req.params.id;

  try {
      // Assuming 'students' is the name of your MySQL table
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


module.exports = router;
