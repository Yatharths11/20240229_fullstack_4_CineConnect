const router = require('../utils/router');
const { jwt, bcrypt } = require('../utils/auth');
const { verifyPassword } = require('../utils/utility');
const Users = require('../schema/users');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and authorization
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in with credentials
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '401':
 *         description: Incorrect username or password
 *       '500':
 *         description: Failed to login. Try again.
 */
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findOne({ username: username });

        if (!user) {
            throw new Error("Username doesn't exist. Please enter the right username.");
        }

        const checkPassword = await verifyPassword(user, password);

        if (!checkPassword) {
            return res.status(401).json({ error: "Incorrect password." });
        }

        const accessToken = jwt.sign({ username: user.username, role: user.role }, process.env.SECRET_KEY, { expiresIn: '10h' });

        res.set('Authorization', 'Bearer ' + accessToken);
        res.status(200).json({ message: "User logged in successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to login. Try again." });
    }
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Logged out successfully
 *       '400':
 *         description: Failed to logout
 */
router.post('/logout', (req, res) => {
    try {
        const token = req.headers.authorization;
        // Verify if the user has the role of "user"
        verifyUserRole(token);
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: "Failed to logout" });
    }
});

module.exports = router;
