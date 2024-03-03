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
      const decodedToken = jwt.verify(token, 'yourSecretKey');
      req.userData = { userId: decodedToken.userId, username: decodedToken.username };
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  });

//API to get all the list of theaters and their details
router.get("/theaters",async (req,res)=>{
    try {
        let theaters = await Theatres.find();
        res.status(200).json(theaters);
    } catch (err) {
        console.error("Error in retrieving data:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})



//API to get details of a particular theater
router.get('/theaters/:id',(req,res)=>{
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
router.post('/theaters',(req,res)=>{
  const theater = req.body
  try {
     Theatres.inserrtMany(theater,(err,docs)=>{
       if(!err)
         res.send('Theater added Successfully')
       else
         console.log('Error In Adding Theater : ', err)
         res.status(403).json({message:"There was an issue adding this the theter"})
     })
  } 
  catch(err) {
    res.status(501).json(err)
  }
    
})


//API to




module.exports = router