require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();

// Middlewares
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

// const db = require("./database/connect_database");

// Defining routes
const manga = require("./routes/manga.route");
const genres = require("./routes/genres.route")

// Use defined routes
app.use("/api/mangas", manga);
app.use("/api/genres", genres)


app.get("/", (req,res ) =>{
    res.send("taboundimek")
  })

module.exports = app;