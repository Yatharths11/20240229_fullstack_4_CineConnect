const router = require('../utils/router');
const { jwt, bcrypt } = require('../utils/auth');
const Movies = require('../schema/movies')
const Users = require('../schema/users')

// Get all movies
router.get("/", async (req, res) => {
  try {
    // Fetch all movies from the database
    const movies = await Movies.find()
    // Return the list of movies in JSON format
    return res.status(200).json(movies)
  } catch (error) {
    // Handle any errors that occur during fetching movies
    res.status(500).json({ error: "Internal server error" })
  }
})

// Insert a new movie
router.post("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const token = req.headers.authorization

    // Check if the JWT token is provided
    if (!token) {
      return res.status(401).json({ error: "Access denied. Token not provided." })
    }

    // Find the user by ID
    const userExist = await Users.findOne({ _id: id })
    const decodedToken = jwt.verify(
      token.split(" ")[1],
      process.env.SECRET_KEY
    )

    // Check if the user exists
    if (!userExist) {
      return res.status(404).json({ error: "User not found." })
    }

    // Check if the user is authorized to create a movie
    if (
      !(decodedToken.username === userExist.username) ||
      !decodedToken.role === "superAdmin"
    ) {
      return res.status(401).json({ error: "Sorry, you're not authorized." })
    }

    // Create a new movie based on the request body
    const newMovie = req.body
    const createdMovie = await Movies.create(newMovie)

    // Return success message and the created movie
    return res.status(200).json({
      message: "Movie created successfully",
      movie: createdMovie,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Failed to create movie." })
  }
})

// Update a movie by ID
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const updatedMovie = req.body

    // Find and update the movie by its ID
    const movie = await Movies.findByIdAndUpdate(id, updatedMovie, {
      new: true,
    })

    // Check if the movie exists
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" })
    }

    // Return success message and the updated movie
    return res.status(200).json({
      message: "Movie updated successfully",
      movie: movie,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Failed to update movie." })
  }
})

// Delete a movie by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id

    // Find and delete the movie by its ID
    const deletedMovie = await Movies.findByIdAndDelete(id)

    // Check if the movie exists
    if (!deletedMovie) {
      return res.status(404).json({ error: "Movie not found" })
    }

    // Return success message and the deleted movie
    return res.status(200).json({
      message: "Movie deleted successfully",
      movie: deletedMovie,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Failed to delete movie." })
  }
})

module.exports = router
