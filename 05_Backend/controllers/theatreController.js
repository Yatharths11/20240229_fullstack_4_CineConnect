const Theatres = require("../models/theatre");
const Movies = require("../models/movies");
const { token_provided, verifyToken } = require("../validators/tokenValidator");
const { check_admin, check_superAdmin } = require('../validators/RoleValidator')
const {
  validateTheatrePost,
  validateTheatreUpdate,
} = require("../validators/theatreValidator");
// const {token_provided,verifyToken} = require('../validators/tokenValidator')
// const { check_superAdmin, check_admin, check_user } = require('../validators/checkRole')

// API to get all the list of theatres and their details
const theatreList = async (req, res) => {
  console.log("I am in");
  try {
    const theatres = await Theatres.find();
    res.status(200).json(theatres);
  } catch (err) {
    console.error("Error retrieving data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// API to get details of a particular theatre
const getTheatreDetailsById = async (req, res) => {
  console.log("inside");
  try {
    const id = req.params.id;
    const theatre = await Theatres.findById(id);
    if (!theatre) {
      return res.status(404).json({ message: "Theatre not found." });
    }
    res.status(200).json(theatre);
  } catch (err) {
    console.error("Error retrieving theatre details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// API to create a new theatre
const createNewTheatre = async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization;
    // Check if the JWT token is provided
    if (!token_provided(token)) {
      return res
        .status(401)
        .json({ error: "Access denied. Token not provided." });
    }
    // Verify the token
    const decodedToken = verifyToken(token);
    // Check if the user is authorized to create a theatre
    if (!decodedToken || (!check_admin(token) && !check_superAdmin(token))) {
      return res
        .status(401)
        .json({ error: "Sorry, you're not authorized to create a theatre." });
    }
    // Create a new theatre based on the request body
    const theatre = req.body;
    if (!validateTheatrePost(theatre)) {
      return res.status(400).send({ message: "Theatre data is incomplete" });
    }
    const newTheatre = await Theatres.create(theatre);
    // Return the newly created theatre
    return res.status(201).json(newTheatre);
  } catch (err) {
    // console.error("Error creating theatre:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// API to delete a theatre by ID
const deleteTheatreById = async (req, res) => {
  const id = req.params.id;
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization;
    // Check if the JWT token is provided
    if (!token_provided(token)) {
      return res
        .status(401)
        .json({ error: "Access denied. Token not provided." });
    }

    // Verify the token
    const decodedToken = verifyToken(token);

    // Check if the user is authorized to delete a theatre
    if (!decodedToken || (!check_admin(token) && !check_superAdmin(token))) {
      return res
        .status(401)
        .json({ error: "Sorry, you're not authorized to delete a theatre." });
    }       

    const result = await Theatres.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No theater with this ID" });
    }
    res.status(200).json({ message: "Theatre deleted successfully" });
  } catch (err) {
    console.error("Error deleting theatre:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// API to get movies of a particular theatre
const getMovies = async (req, res) => {
  try {
    const movies = await Movies.find({ theatre_id: req.params.id });
    console.log(movies);
    if (!movies) {
      res
        .status(200)
        .json(
          `There are no movies showing at this theatre right now.\nPlease come back again`
        );
    } else {
      res.status(200).json(movies);
    }
  } catch (err) {
    console.error("Error retrieving movies:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// exports
module.exports = {
  theatreList,
  getTheatreDetailsById,
  createNewTheatre,
  deleteTheatreById,
  getMovies,
};
