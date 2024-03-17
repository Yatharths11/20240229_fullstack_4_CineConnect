const Movies = require("../models/movies.js");
const {
  check_admin,
  check_superAdmin,
} = require("../validators/RoleValidator.js");
const { token_provided, verifyToken } = require("../validators/tokenValidator");
const { validateMovieData } = require("../validators/validateMovieData.js");

// Get all movies
const getMovies = async (req, res) => {
  try {
    // Fetch all movies from the database
    const movies = await Movies.find();
    // Return the list of movies in JSON format
    return res.status(200).json(movies);
  } catch (error) {
    // Handle any errors that occur during fetching movies
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a specific movie by ID
const getMovieById = async (req, res) => {
  try {
    const movieId = req.params.id;
    // Fetch the movie from the database by its ID
    const movie = await Movies.findById(movieId);
    // Check if the movie exists
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    // Return the movie details in JSON format
    return res.status(200).json(movie);
  } catch (error) {
    // Handle any errors that occur during fetching the movie
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Find a movie by name using query parameters
// API Call
// http://localhost:5000/api/movies/search/name?name=Interstellar
const getMovieByName = async (req, res) => {
  try {
    const name = req.query.name;

    console.log("query " + name);

    // Check if the name parameter is provided
    if (!name) {
      return res.status(400).send("Name parameter is missing");
    }

    // Find the movie by its name
    const movie = await Movies.find({ name: name });

    // Check if the movie exists
    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    // Return the found movie
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Failed to find movie.");
  }
};

// Insert a new movie
const insertNewMovie = async (req, res) => {
  try {
    const token = req.headers.authorization;
    // Check if the JWT token is provided
    if (!token_provided(token)) {
      return res
        .status(401)
        .json({ error: "Access denied. Token not provided." });
    }

    // Find the user by ID
    const decodedToken = verifyToken(token);

    console.log("token check:" + decodedToken);
    // Check if the user is authorized to create a movie
    if (!decodedToken || (!check_admin(token) && !check_superAdmin(token))) {
      return res.status(401).json({ error: "Sorry, you're not authorized." });
    }

    // Create a new movie based on the request body
    const newMovie = req.body;

    // Validate the movie data
    // const validationResult = validateMovieData(newMovie);
    // if (!validationResult.valid) {
    //   return res.status(400).json({ error: validationResult.error });
    // }

    const createdMovie = await Movies.create(newMovie);
    // Return success message and the created movie
    console.log("here");
    return res.status(200).json({
      message: "Movie created successfully",
      movie: createdMovie,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create movie." });
  }
};

const updateMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedMovie = req.body;
    const token = req.headers.authorization;

    // Check if the JWT token is provided
    if (!token_provided(token)) {
      return res
        .status(401)
        .json({ error: "Access denied. Token not provided." });
    }

    // Verify the token and extract the decoded token
    const decodedToken = verifyToken(token);

    // Check if the user is authorized to update a movie
    if (!decodedToken || (!check_admin(token) && !check_superAdmin(token))) {
      return res.status(401).json({ error: "Sorry, you're not authorized." });
    }

    // Find and update the movie by its ID
    const movie = await Movies.findByIdAndUpdate(id, updatedMovie, {
      new: true,
    });

    // Check if the movie exists
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Return success message and the updated movie
    return res.status(200).json({
      message: "Movie updated successfully",
      movie: movie,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update movie." });
  }
};

// Delete a movie by ID
const deleteMovieById = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization;

    // Check if the JWT token is provided
    if (!token_provided(token)) {
      return res
        .status(401)
        .json({ error: "Access denied. Token not provided." });
    }

    // Verify the token and extract the decoded token
    const decodedToken = verifyToken(token);

    // Check if the user is authorized to delete a movie
    if (!decodedToken || (!check_admin(token) && !check_superAdmin(token))) {
      return res.status(401).json({ error: "Sorry, you're not authorized." });
    }

    // Find and delete the movie by its ID
    const deletedMovie = await Movies.findByIdAndDelete(id);

    // Check if the movie exists
    if (!deletedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Return success message and the deleted movie
    return res.status(200).json({
      message: "Movie deleted successfully",
      movie: deletedMovie,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete movie." });
  }
};

// exports
module.exports = {
  getMovies,
  getMovieById,
  getMovieByName,
  insertNewMovie,
  updateMovie,
  deleteMovieById,
};
