const express = require("express");
const router = express.Router();
const db = require("../database/connect_database");


/**
 * Retrieve all genres.
 *
 * @route GET /api/genres
 * @returns {array} - An array of all genres.
 * @throws {object} - Returns a 500 Internal Server Error if the retrieval fails.
 */
router.get('/', async (req, res) => {
    try {
      const genres = await db('genres')
      res.status(200).send(genres)
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "Something went wrong",
        value: error
      });
    }
});


/**
 * Retrieve genre by id.
 *
 * @route GET /api/genres/:id
 * @param {string} -  req.params.id - The id of the genre to retrieve
 * @returns {array} - An array of all genres.
 * @throws {object} - Returns a 500 Internal Server Error if the retrieval fails.
 */
router.get('/:id', async (req, res) => {
  const genreId = req.params.id;
  try {
    const genre = await db('genres').where('id', genreId).first();

    if(!genre) {
      return res.status(404).send({
        error: "genre not found",
      });
    }

    res.status(200).send(genre)
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: "Something went wrong",
      value: error
    });
  }
  
});




module.exports = router;
