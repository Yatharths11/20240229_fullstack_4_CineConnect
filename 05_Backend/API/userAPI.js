const router = require('../utils/router');
const Users = require('../schema/users')
const { hashPassword, decodeToken} = require('../utils/utility')


async function verifyUserRole(token) {
    try {
        // Check if the token exists
        if (!token) {
            res.status(401).send({message : "Access denied. Token not provided."})
        }
        // Verify the token
        const decodedToken = decodeToken(token)
        // Fetch the user role
        const role = decodedToken.role
        
        if (!role) {
            res.status(404).send({message : "User not found"})
        }
        // Check if the user has the role of "user"
        if (role !== 'user') {
            res.status(403).send({message: "Forbidden. Only users can perform this action." })
        }
        return true// User has the role of "user"
    } catch (error) {
        throw error// Forward the error to the caller
    }
}
// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password} = req.body
        console.log(req.body)
        // Check if username and email already exists
        const usernameExist = await Users.findOne({ username: username })
        const emailExist = await Users.findOne({email : email})
        if (usernameExist) {
            return res.status(401).json({ error: "Username already exists. Please try another Username." })
        }
        if (emailExist) {
            return res.status(401).json({ error: "Email already exists. Please try another email."})
        }
        if (!password) {
            return res.status(400).json({ error: "Password is required." })
        }
        // Hash the password
        const hashedPassword = await hashPassword(password)
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


//Get the information of specific User
router.get('/:id', async(req,res) => {

    try{
        const id = req.params.id
        const token = req.headers.authorization// Extract the JWT token from the request headers
        // Check if the token exists
        if (!token) {
            return res.status(401).send({ error: "Access denied. Token not provided." })
        }
        
        const userExist = await Users.findOne({_id : id})
        const decodedToken = decodeToken(token)// Verify the token
        
        // Check id if such user exist or not
        if(!userExist){
            res.status(404).send({ error: "User not Found." })
        }
        // Check if the authorised person for request informations.
        if(!(decodedToken.username === userExist.username) || !decodedToken.role === 'superAdmin' ){
            res.status(401).status({ error: "Sorry, you're not Authorised." })
        }
        return res.status(200).send(userExist)        
    }
    catch(error){
        console.log(error)
        return res.status(500).send({ error: "Failed to retrieve data." })
    }
    
})
// Update the users information
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const token = req.headers.authorization // Extract the JWT token from the request headers
        // Check if the token exists
        if (!token) {
            return res.status(401).send({ error: "Access denied. Token not provided." })
        }
        // Verify the token
        const decodedToken = decodeToken(token)
        const requestbyUser = await Users.findOne({username : decodedToken.username})
        // Check if the token owner is the same as the user to be updated
        if (requestbyUser._id.toString() !== id) {
            return res.status(403).send({ error: "Access denied. You are not authorized to update this user." })
        }
        // Find the user to be updated
        const userToUpdate = await Users.findById(id)
        if (!userToUpdate) {
            return res.status(404).json({ error: "User not found" })
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
            // const salt = await bcrypt.genSalt()
            const hashedPassword = await hashPassword(req.body.password)
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
            return res.status(401).send({ error: "Access denied. Token not provided." })
        }
        const decodedToken = decodeToken(token)
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