const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Users = require('../schema/users.js')


// POST /api/users/register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password} = req.body
        // Check if username and email already exists
        const usernameExist = await Users.findOne({ username: username })
        const emailExist = await Users.findOne({email : email})
        if (usernameExist) {
            return res.status(401).json({ error: "Username already exists. Please try another Username." })
        }

        if (emailExist) {
            return res.status(401).json({ error: "Email already exists. Please try another email."})
        }

        // Hash the password
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create a new user
        const newUser = await Users.create({
            username: username,
            email: email,
            password: hashedPassword,
        })

        res.status(201).json({ message: 'New user registered successfully.', user: newUser })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to register new user." })
    }
})


// POST /api/users/login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body

        // Check if the user exists
        const user = await Users.findOne({ username: username })

        if (!user) {
            return res.status(401).json({ error: "Username doesn't exist. Please enter the right username." })
        }

        // Check if the password is correct
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(401).json({ error: "Incorrect password." })
        }

        // User is authenticated, create JWT token
        const accessToken = jwt.sign({ username: user.username, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' })

        res.set('Authorization', 'Bearer ' + accessToken)
        res.status(200).json({ message: "User logged in successfully."})
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to login. Try again." })
    }
})

// router.get('/logout'){

// }// Waiting to understand how to store token in cookie and its uasges.



//Get the information of specific User
router.get('/:id', async(req,res) => {
    
    try{
        const id = req.params.id
        const token = req.headers.authorization// Extract the JWT token from the request headers
        // Check if the token exists
        if (!token) {
            return res.status(401).send("Access denied. Token not provided.")
        }
        
        const userExist = await Users.findOne({_id : id})
        const decodedToken = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY)// Verify the token
        
        // Check id if such user exist or not
        if(!userExist){
            res.status(404).send("User not Found.")
        }

        // Check if the authorised person for request informations.
        if(!(decodedToken.username === userExist.username) || !decodedToken.role === 'superAdmin' ){
            res.status(401).status("Sorry, you're not Authorised.")
        }
        
        return res.status(200).send(userExist)        
    }
    catch(error){
        console.log(error)
        return res.status(500).send("Failed to retrieve data.")
    }
    
})

// Update the users information
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const token = req.headers.authorization // Extract the JWT token from the request headers

        // Check if the token exists
        if (!token) {
            return res.status(401).send("Access denied. Token not provided.")
        }

        // Verify the token
        const decodedToken = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY)
        const requestbyUser = await Users.findOne({username : decodedToken.username})
        // Check if the token owner is the same as the user to be updated
        if (requestbyUser._id.toString() !== id) {
            return res.status(403).send("Access denied. You are not authorized to update this user.")
        }

        // Find the user to be updated
        const userToUpdate = await Users.findById(id)
        if (!userToUpdate) {
            return res.status(404).json({ error: 'User not found' })
        }

        // Update user details, if some fields are not provided in the request body, 
        // keep them the same as before
        if (req.body.username) {
            userToUpdate.username = req.body.username
        }
        if (req.body.email) {
            userToUpdate.email = req.body.email
        }
        if (req.body.password) {
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(req.body.password,salt)
            userToUpdate.password = hashedPassword
        }

        // Save the updated user
        const updatedUser = await userToUpdate.save()

        res.status(200).json({ message: 'User details updated', user_details: updatedUser })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to update user details' })
    }
})


// DELETE existing users
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        // const { username, password } = req.body
        const token = req.headers.authorization// Extract the JWT token from the request headers
        // Check if the token exists
        if (!token) {
            return res.status(401).send("Access denied. Token not provided.")
        }

        const decodedToken = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY)
        const requestbyUser = await Users.findOne({username : decodedToken.username})

        if (!requestbyUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        if( requestbyUser._id.toString() !== id) {
            return res.status(403).json({ error: 'Access denied. You are not authorized to delete this user.' })
        }

        // Delete user
        const deletedUser = await Users.findByIdAndDelete(id)
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' })
        }
        
        res.status(200).json({ message: 'User deleted' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to delete user' })
    }
})



module.exports = router