const router = require('../utils/router');
const Theatres = require('../schema/theatre');
const Movies = require('../schema/movies');
const { token_provided, verifyToken } = require('../validator/tokenValidator');
const { check_superAdmin, check_admin } = require('../validator/RoleValidator');
const { validateTheatrePost } = require('../validator/theatreValidator');

/**
 * @swagger
 * tags:
 *   name: Theatres
 *   description: APIs related to theatres and movies
 */

/**
 * @swagger
 * /theatres:
 *   get:
 *     summary: Get all theatres
 *     tags: [Theatres]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - _id: "123"
 *                 name: "Theatre A"
 *               - _id: "456"
 *                 name: "Theatre B"
 *       '500':
 *         description: Internal Server Error
 */
router.get("/", async (req, res) => {
    try {
        const theatres = await Theatres.find();
        res.status(200).json(theatres);
    } catch (err) {
        console.error("Error retrieving data:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/**
 * @swagger
 * /theatres/{id}:
 *   get:
 *     summary: Get details of a specific theatre
 *     tags: [Theatres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the theatre
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               _id: "123"
 *               name: "Theatre A"
 *       '404':
 *         description: Theatre not found
 *       '500':
 *         description: Internal Server Error
 */
router.get('/:id', async (req, res) => {
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
});

/**
 * @swagger
 * /theatres:
 *   post:
 *     summary: Create a new theatre
 *     tags: [Theatres]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Theatre'
 *     responses:
 *       '201':
 *         description: Theatre created successfully
 *       '400':
 *         description: Invalid request or incomplete data
 *       '401':
 *         description: Access denied or unauthorized
 *       '403':
 *         description: Access denied. You are not authorized to create a theatre.
 *       '500':
 *         description: Internal Server Error
 */
router.post('/', async (req, res) => {
    if (!token_provided(req.headers.authorization)) {
        return res.status(401).json({ auth: false, message: 'Failed to authenticate.' });
    }

    if (!check_admin(req.headers.authorization) && !check_superAdmin(req.headers.authorization)) {
        return res.status(403).json({ auth: false, message: "You are not authorized to perform this action!" });
    }

    const theatre = req.body;
    try {
        const token = req.headers.authorization;
        const decodedToken = verifyToken(token);

        if (!decodedToken || (!check_admin(token) && !check_superAdmin(token))) {
            return res.status(401).json({ error: "Sorry, you're not authorized to create a theatre." });
        }

        if (!validateTheatrePost(theatre)) {
            return res.status(400).json({ message: "Theatre data is incomplete" });
        }

        const newTheatre = await Theatres.create(theatre);
        return res.status(201).json(newTheatre);
    } catch (err) {
        console.error("Error creating theatre:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
/**
 * @swagger
 * /theatres/deleteTheatre/{id}:
 *   delete:
 *     summary: Delete a theatre by ID
 *     tags: [Theatres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the theatre to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Theatre deleted successfully
 *       '401':
 *         description: Access denied or unauthorized
 *       '403':
 *         description: Access denied. You are not authorized to delete this theatre.
 *       '404':
 *         description: Theatre not found
 *       '500':
 *         description: Internal Server Error
 */
router.delete('/deleteTheatre/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const token = req.headers.authorization;

        if (!token_provided(token)) {
            return res.status(401).json({ error: "Access denied. Token not provided." });
        }

        const decodedToken = verifyToken(token);

        if (!decodedToken || (!check_admin(token) && !check_superAdmin(token))) {
            return res.status(401).json({ error: "Sorry, you're not authorized to delete a theatre." });
        }

        const result = await Theatres.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No theatre with this ID' });
        }

        res.status(200).json({ message: 'Theatre deleted successfully' });
    } catch (err) {
        console.error("Error deleting theatre:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/**
 * @swagger
 * /theatres/{id}/movies:
 *   get:
 *     summary: Get movies of a particular theatre
 *     tags: [Theatres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the theatre
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - _id: "123"
 *                 title: "Movie A"
 *               - _id: "456"
 *                 title: "Movie B"
 *       '500':
 *         description: Internal Server Error
 */
router.get("/:id/movies", async (req, res) => {
    try {
        const movies = await Movies.find({ theatre_id: req.params.id });

        if (!movies || movies.length === 0) {
            res.status(200).json("There are no movies showing at this theatre right now.\nPlease come back again");
        } else {
            res.status(200).json(movies);
        }
    } catch (err) {
        console.error("Error retrieving movies:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;