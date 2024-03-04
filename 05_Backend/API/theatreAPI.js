const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Theatres = require('../schema/theatre.js')



router.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies (as sent by HTML forms)
router.use(express.json())

router.use((req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      req.userData = { userId: decodedToken.userId, username: decodedToken.username };
      next();
    } catch (error) {

        console.log("here")
      return res.status(401).json({ message: 'Unauthorized' });
    }
  });

//API to get all the list of theaters and their details
router.get("/",async (req,res)=>{
    try {
        let theaters = await Theatres.find();
        res.status(200).json(theaters);
    } catch (err) {
        console.error("Error in retrieving data:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})



//API to get details of a particular theater
router.get('/:id',(req,res)=>{
    try{
        const theater = Theatres.find({_id : req.query.id})
        .then(result=>{
            if(!result){
                return res.status(404).json({message:"Theater not found."});
            }else{
              return res.status(200).json(result[0]);
            }
          })
          .catch(e =>{
            console.log(e);
            res.status(500).json({error: e});
          })
    }
    catch(err){
        res.status(501).json(err);
    }
})


//API to create a new theaters
// Create a new theatre
router.post('/', async (req, res) => {
    const theater = req.body;

    try {
        const newTheatre = await createTheatre(theater);
        res.status(201).json(newTheatre);
    } catch (err) {
        console.error("Error creating theatre:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Function to create a new theatre
async function createTheatre(theatreData) {
    try {
        const newTheatre = await Theatres.create(theatreData);
        return newTheatre;
    } catch (err) {
        console.error("Error creating theatre:", err);
        throw err; // Re-throw the error to be caught in the calling code
    }
}

router.delete('/:id',async (req,res)=>{
    let id=req.params.id;
    try {
        const result = await Theatres.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No data with that ID' });
        }
        res.status(200).json({ message: 'Theater deleted successfully' });
    } catch (err) {
        console.error("Error deleting theatre:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


module.exports = router