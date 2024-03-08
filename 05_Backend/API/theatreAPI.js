const router = require('../utils/router');
const Theatres = require('../schema/theatre')
const Movies = require('../schema/movies')
const { token_provided, verifyToken } = require('../validator/tokenValidator')
// const { check_admin, check_superAdmin } = require('../validator/RoleValidator')
const { validateTheatrePost ,validateTheatreUpdate } = require('../validator/theatreValidator')
// const {token_provided,verifyToken} = require('../validator/tokenValidator')
const { check_superAdmin, check_admin, check_user } = require('../validator/checkRole')


// API to get all the list of theatres and their details
router.get("/", async (req, res) => {

    console.log("I am in")
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
    console.log("inside")
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
})


// API to create a new theatre
router.post('/', async (req, res) => {

    //check token 
    if(!(await verifyToken(req.header.authorization))){
        return res.status(401).json({ auth: false, message: 'Failed to authenticate.' })
    }
    if(!check_admin || !check_superAdmin){
        return res.status(403).json({auth:false ,message:"You are not authorized to perform this action!"})
    }

    const theatre = req.body
    try {
        // Extract the token from the request headers
        const token = req.headers.authorization
        // Check if the JWT token is provided
        if (!token_provided(token)) {
            return res.status(401).json({ error: "Access denied. Token not provided." })
        }
        // Verify the token
        const decodedToken = verifyToken(token)
        // Check if the user is authorized to create a theatre
        if (!decodedToken || (!check_admin(token) && !check_superAdmin(token))) {
            return res.status(401).json({ error: "Sorry, you're not authorized to create a theatre." })
        }
        // Create a new theatre based on the request body
        const theatre = req.body
        if(!validateTheatrePost(theatre)){
            return res.status(400).send({message : "Theatre data is incomplete"})
        }
        const newTheatre = await Theatres.create(theatre)
        // Return the newly created theatre
        return res.status(201).json(newTheatre)
    } catch (err) {
        console.error("Error creating theatre:", err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})


// API to delete a theatre by ID
router.delete('/deleteTheatre/:id', async (req, res) => {
    const id = req.params.id
    try {
        // Extract the token from the request headers
        const token = req.headers.authorization
        // Check if the JWT token is provided
        if (!token_provided(token)) {
            return res.status(401).json({ error: "Access denied. Token not provided." })
        }

        // Verify the token
        const decodedToken = verifyToken(token)
        
        // Check if the user is authorized to delete a theatre
        if (!decodedToken || (!check_admin(token) && !check_superAdmin(token))) {
            return res.status(401).json({ error: "Sorry, you're not authorized to delete a theatre." })
        }

        const result = await Theatres.deleteOne({ _id: id })
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No theater with this ID' })
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
        const movies = await Movies.find({ theatre_id: req.params.id })
        console.log(movies)
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

module.exports = router