const router = require('../utils/router');
const { jwt, bcrypt } = require('../utils/auth');
const Theatres = require('../schema/theatre')
const Movies = require('../schema/movies')


router.use((req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
    if (!token) {
        
      return res.status(401).json({ message: 'Unauthorized' })
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
      req.userData = { userId: decodedToken.userId, username: decodedToken.username }
      next()
    } catch (error) {
        console.log("here")
      return res.status(401).json({ message: 'Unauthorized' })
    }
  })
// API to get all the list of theatres and their details
router.get("/", async (req, res) => {
    try {
        const theatres = await Theatres.find()
        res.status(200).json(theatres)
    } catch (err) {
        console.error("Error retrieving data:", err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})
// API to get details of a particular theatre
router.get('/:id', async (req, res) => {
    try {
        const theatre = await Theatres.findById(req.params.id)
        if (!theatre) {
            return res.status(404).json({ message: "Theatre not found." })
        }
        res.status(200).json(theatre)
    } catch (err) {
        console.error("Error retrieving theatre details:", err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})
// API to create a new theatre
router.post('/', async (req, res) => {
    const theatre = req.body
    try {
        const newTheatre = await Theatres.create(theatre)
        res.status(201).json(newTheatre)
    } catch (err) {
        console.error("Error creating theatre:", err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})
// API to delete a theatre by ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const result = await Theatres.deleteOne({ _id: id })
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No data with that ID' })
        }
        res.status(200).json({ message: 'Theatre deleted successfully' })
    } catch (err) {
        console.error("Error deleting theatre:", err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})
// API to get movies of a particular theatre
router.get("/:id/movies", async (req, res) => {
    try {
        const movies = await Movies.findOne({ theatre_id: req.params.id })
        if (!movies) {
            res.status(200).json(`There are no movies showing at this theatre right now.\nPlease come back again`)
        } else {
            res.status(200).json(movies)
        }
    } catch (err) {
        console.error("Error retrieving movies:", err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})
// API to update a theatre by ID
router.put("/:id", async (req, res) => {
    const theaterId = req.params.id
    try {
        const updatedTheatre = await Theatres.findByIdAndUpdate(
            theaterId,
            req.body, // Update with the data provided in req.body
            { new: true, runValidators: true }
        )
        if (!updatedTheatre) {
            return res.status(404).json({ message: 'Theater not found' })
        }
        res.status(200).json(updatedTheatre)
    } catch (err) {
        console.error("Error updating theatre:", err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})
module.exports = router