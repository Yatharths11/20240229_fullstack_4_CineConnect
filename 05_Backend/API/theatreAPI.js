const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Theatres = require('../schema/theatre.js')
const Movies = require('../schema/movies.js')



router.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies (as sent by HTML forms)
router.use(express.json())

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

//API to get all the list of theatres and their details
router.get("/",async (req,res)=>{
    
    try {
        let theatres = await Theatres.find()
        res.status(200).json(theatres)
    } catch (err) {
        console.error("Error in retrieving data:", err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})



//API to get details of a particular theatre
router.get('/:id',(req,res)=>{
    try{
        const theatre = Theatres.find({_id : req.query.id})
        .then(result=>{
            if(!result){
                return res.status(404).json({message:"theatre not found."})
            }else{
              return res.status(200).json(result[0])
            }
          })
          .catch(e =>{
            console.log(e)
            res.status(500).json({error: e})
          })
    }
    catch(err){
        res.status(501).json(err)
    }
})


//API to create a new theatres
// Create a new theatre
router.post('/', async (req, res) => {
    const theatre = req.body

    try {
        const newTheatre = await createTheatre(theatre)
        res.status(201).json(newTheatre)
    } catch (err) {
        console.error("Error creating theatre:", err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

// Function to create a new theatre
async function createTheatre(theatreData) {
    try {
        const newTheatre = await Theatres.create(theatreData)
        return newTheatre
    } catch (err) {
        console.error("Error creating theatre:", err)
        throw err // Re-throw the error to be caught in the calling code
    }
}

router.delete('/:id',async (req,res)=>{
    let id=req.params.id
    try {
        const result = await Theatres.deleteOne({ _id: id }).exec()
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No data with that ID' })
        }
        res.status(200).json({ message: 'theatre deleted successfully' })
    } catch (err) {
        console.error("Error deleting theatre:", err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

router.get("/:id/movies",async (req,res)=>{
    try{
        const movies = await Movies.findOne({theatre_id:req.params.id})
        .then((data)=>{
            if(!data){
                res.status(200).json(`There are no movies showning at this theater right now.\n Please come back again`)
            }
            else{
                res.status(200).json(data)
            }
        })
    }
    catch(err){
        res.status(501).json(err)
    }
})


router.put( "/:id", async (req,res)=>{
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