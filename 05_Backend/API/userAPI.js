const router = require('../utils/router');
const Users = require('../schema/users')
const { hashPassword, decodeToken } = require('../utils/utility')
const { check_user } = require('../validator/checkRole')
const { token_provided, verifyToken } = require('../validator/tokenValidator')


// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!password) {
            return res.status(400).json({ error: "Password is required." })
        }
        // Check if username and email already exist
        const usernameExist = await Users.findOne({ username: username })
        const emailExist = await Users.findOne({ email: email })

        if (usernameExist) {
            return res.status(401).json({ error: "Username already exists. Please try another Username." })
        }

        if (emailExist) {
            return res.status(401).json({ error: "Email already exists. Please try another email." })
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
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const token = req.headers.authorization

        if (!token_provided(token)) {
            return res.status(401).send({ error: "Access denied. Token not provided." })
        }

        const decodedToken = verifyToken(token)

        if (!decodedToken || !check_user(token)) {
            return res.status(403).send({ message: "Forbidden. Only users can perform this action." })
        }

        const userExist = await Users.findOne({ _id: id })

        if (!userExist) {
            return res.status(404).send({ error: "User not Found." })
        }

        if (!(decodedToken.username === userExist.username) || !decodedToken.role === 'superAdmin') {
            return res.status(401).send({ error: "Sorry, you're not Authorised." })
        }

        return res.status(200).send(userExist)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: "Failed to retrieve data." })
    }
})

// Update the user's information
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const token = req.headers.authorization

        if (!token_provided(token)) {
            return res.status(401).send({ error: "Access denied. Token not provided." })
        }

        const decodedToken = verifyToken(token);
        const requestbyUser = await Users.findOne({ username: decodedToken.username })

        if (requestbyUser._id.toString() !== id) {
            return res.status(403).send({ error: "Access denied. You are not authorized to update this user." })
        }

        const userToUpdate = await Users.findById(id)

        if (!userToUpdate) {
            return res.status(404).json({ error: "User not found" })
        }

        if (req.body.username) {
            userToUpdate.username = req.body.username
        }

        if (req.body.email) {
            userToUpdate.email = req.body.email
        }

        if (req.body.password) {
            const hashedPassword = await hashPassword(req.body.password)
            userToUpdate.password = hashedPassword
        }

        const updatedUser = await userToUpdate.save();
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
        const token = req.headers.authorization

        if (!token_provided(token)) {
            return res.status(401).send({ error: "Access denied. Token not provided." })
        }

        const decodedToken = verifyToken(token);
        const requestbyUser = await Users.findOne({ username: decodedToken.username })

        if (!requestbyUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        if (requestbyUser._id.toString() !== id) {
            return res.status(403).json({ error: 'Access denied. You are not authorized to delete this user.' })
        }

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