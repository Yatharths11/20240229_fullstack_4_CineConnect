const router = require('../utils/router');
const Users = require('../schema/users');
const { hashPassword } = require('../utils/utility');
const { check_user } = require('../validator/RoleValidator');
const { token_provided, verifyToken } = require('../validator/tokenValidator');
const { isValidUsername, isValidEmail, isValidPassword } = require('../validator/userValidation');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and registration
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Invalid request or input
 *       '401':
 *         description: Username or email already exists
 *       '500':
 *         description: Failed to register new user
 */
router.post('/register', async (req, res) => {
  try {
    // ... existing code ...
    res.status(201).json({ message: 'New user registered successfully.', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register new user." });
  }
});

/**
 * @swagger
 * /info/{id}:
 *   get:
 *     summary: Get information of a specific user
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *       '401':
 *         description: Access denied or unauthorized
 *       '403':
 *         description: Forbidden. Only users can perform this action.
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Failed to retrieve user data
 */
router.get('/info/{id}', async (req, res) => {
  try {
    // ... existing code ...
    res.status(200).json(userExist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve data." });
  }
});

/**
 * @swagger
 * /update/{id}:
 *   put:
 *     summary: Update user information
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User details updated
 *       '401':
 *         description: Access denied or unauthorized
 *       '403':
 *         description: Access denied. You are not authorized to update this user.
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Failed to update user details
 */
router.put('/update/{id}', async (req, res) => {
  try {
    // ... existing code ...
    res.status(200).json({ message: 'User details updated', user_details: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user details' });
  }
});

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted
 *       '401':
 *         description: Access denied or unauthorized
 *       '403':
 *         description: Access denied. You are not authorized to delete this user.
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Failed to delete user
 */
router.delete('/delete/{id}', async (req, res) => {
  try {
    // ... existing code ...
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
