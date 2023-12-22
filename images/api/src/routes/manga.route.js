const express = require("express");
const router = express.Router();
const db = require("../database/connect_database");

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

module.exports = router;
