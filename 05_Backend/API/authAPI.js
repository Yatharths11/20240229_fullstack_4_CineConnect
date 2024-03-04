const router = require('../utils/router')
const { jwt, bcrypt } = require('../utils/auth')
const Users = require('../schema/users')

// Login with credentials
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
        const accessToken = jwt.sign({ username: user.username, role: user.role }, process.env.SECRET_KEY, { expiresIn: '10h' })

        res.set('Authorization', 'Bearer ' + accessToken);
        res.status(200).json({ message: "User logged in successfully." })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to login. Try again." })
    }
});

// Logout route
router.post('/logout', (req, res) => {
    try {
        const token = req.headers.authorization; // Extract the JWT token from the request headers
        // Verify if the user has the role of "user"
        verifyUserRole(token);
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: "Failed to logout" })
    }
});

module.exports = router