const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Movies = require("../schema/movies.js");
const movies = require("../schema/movies.js");

//get by Id

//get all movies
router.get("/", async (req, res) => {
  //fetch Movies from MongoDb
  try {
    //fetch movies in movies
    const get_movies = await movies.find();
    //return data in json
    return res.status(200).json(get_movies);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
