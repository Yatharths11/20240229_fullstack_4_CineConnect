const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Movies = require("../schema/movies.js");
const movies = require("../schema/movies.js");
const { test } = require("media-typer");
const Users = require("../schema/users.js");
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

//post //Insert Movies in DB
router.post("/:id", async (req, res) => {
  // Test that user is Admin or not
  try {
    const id = req.params.id;
    const token = req.headers.authorization; // Extract the JWT token from the request headers
    // Check if the token exists
    if (!token) {
      return res.status(401).send("Access denied. Token not provided.");
    }

    const userExist = await Users.findOne({ _id: id });
    const decodedToken = jwt.verify(
      token.split(" ")[1],
      process.env.SECRET_KEY
    ); // Verify the token

    // Check id if such user exist or not
    if (!userExist) {
      res.status(404).send("User not Found.");
    }

    // Check if the authorised person for request informations.
    if (
      !(decodedToken.username === userExist.username) ||
      !decodedToken.role === "superAdmin"
    ) {
      res.status(401).status("Sorry, you're not Authorised.");
    }
    //now User is Valid

    // adding new Movie

    const newmovie = req.body;
    console.log("print Movie data :" + newmovie);
    const createmovie = await movies.create(newmovie);



    return res.status(200).json({
      

      message:"user is valid"

    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Failed to retrieve data.");
  }
});

module.exports = router;
