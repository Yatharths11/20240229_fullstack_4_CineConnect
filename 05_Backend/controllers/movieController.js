const Movies = require("../models/movies.js");
const {
  check_admin,
  check_superAdmin,
} = require("../validators/RoleValidator.js");
const { token_provided, verifyToken } = require("../validators/tokenValidator");
const { validateMovieData } = require("../validators/validateMovieData.js");

// Get all movies
/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all movies
 *     description: Retrieve a list of all movies from the database.
 *     responses:
 *       200:
 *         description: Successful response with the list of movies.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/MovieResponse'
 *       500:
 *         description: Internal Server Error. Failed to fetch movies.
 */
router.get("/", async (req, res) => {

  try {
    // Fetch all movies from the database
    const movies = await Movies.find();
    // Return the list of movies in JSON format
    return res.status(200).json(movies);
  } catch (error) {
    // Handle any errors that occur during fetching movies
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a specific movie by ID
/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get a specific movie by ID
 *     description: Retrieve details of a movie using its ID from the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the movie to retrieve
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful operation. Returns the details of the requested movie.
 *         schema:
 *           $ref: '#/definitions/MovieResponse'
 *       404:
 *         description: Movie not found. The specified ID does not match any existing movie.
 *         schema:
 *           $ref: '#/definitions/Error'
 *       500:
 *         description: Internal Server Error. An unexpected error occurred while processing the request.
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.get("/:id", async (req, res) => {
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
});


// Find a movie by name using query parameters
// API Call
// http://localhost:5000/api/movies/search/name?name=Interstellar
/**
 * @swagger
 * /search/name:
 *   get:
 *     summary: Get a movie by name using query parameters
 *     description: Retrieve a movie by its name using query parameters.
 *     parameters:
 *       - in: query
 *         name: name
 *         description: The name of the movie to search for.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful retrieval of the movie by name.
 *         schema:
 *           $ref: '#/definitions/MovieResponse'
 *       400:
 *         description: Bad Request. Name parameter is missing.
 *       404:
 *         description: Movie not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get("/search/name", async (req, res) => {
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
    if (!movie || movie.length === 0) {
      return res.status(404).send("Movie not found");
    }

    // Return the found movie
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Failed to find movie.");
  }
});



// Insert a new movie
/**
 * @swagger
 * /post:
 *   post:
 *     summary: Create a new movie
 *     description: Create a new movie in the database.
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: header
 *         name: authorization
 *         type: string
 *         required: true
 *         description: JWT token for authentication
 *       - in: body
 *         name: newMovie
 *         description: The movie object to be created
 *         required: true
 *         schema:
 *           $ref: '#/definitions/NewMovieRequest'
 *     responses:
 *       200:
 *         description: Movie created successfully
 *         schema:
 *           $ref: '#/definitions/MovieResponse'
 *       400:
 *         description: Bad Request. Invalid movie data.
 *       401:
 *         description: Access denied. Token not provided.
 *       500:
 *         description: Internal Server Error
 */
router.post("/post", async (req, res) => {
  try {
    const token = req.headers.authorization;

    // Check if the JWT token is provided
    if (!token_provided(token)) {
      return res.status(401).json({ error: "Access denied. Token not provided." });
    }
    // Find the user by ID
    const decodedToken = verifyToken(token);

    // Check if the user is authorized to create a movie
    if (!decodedToken || (!check_admin(token) && !check_superAdmin(token))) {
      return res.status(401).json({ error: "Sorry, you're not authorized." });
    }

    // Create a new movie based on the request body
    const newMovie = req.body;

    // Validate the movie data
    const validationResult = validateMovieData(newMovie);
    if (!validationResult.valid) {
      return res.status(400).json({ error: validationResult.error });
    }

    const createdMovie = await Movies.create(newMovie);

    // Return success message and the created movie
    return res.status(200).json({
      message: "Movie created successfully",
      movie: createdMovie,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create movie." });
  }
});


/**
 * @swagger
 * /update/{id}:
 *   put:
 *     summary: Update a movie by ID
 *     description: Update a movie's information by providing the movie ID.
 *     tags:
 *       - Movies
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the movie to be updated
 *         required: true
 *         type: string
 *       - name: body
 *         in: body
 *         description: Updated movie data
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UpdateMovieRequest'
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *         schema:
 *           $ref: '#/definitions/MovieResponse'
 *       401:
 *         description: Access denied. Token not provided.
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedMovie = req.body;
    const token = req.headers.authorization;

    // Check if the JWT token is provided
    if (!token_provided(token)) {
      return res.status(401).json({ error: "Access denied. Token not provided." });
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
});

// Delete a movie by ID
/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     description: Deletes a movie from the database based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the movie to be deleted
 *         required: true
 *         type: string
 *       - in: header
 *         name: Authorization
 *         description: JWT token for authentication
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *         schema:
 *           $ref: '#/definitions/MovieResponse'
 *       401:
 *         description: Access denied. Token not provided.
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/delete/:id", async (req, res) => {
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
});

// exports
module.exports = {
  getMovies,
  getMovieById,
  getMovieByName,
  insertNewMovie,
  updateMovie,
  deleteMovieById,
};
