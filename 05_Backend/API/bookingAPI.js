const router = require('../utils/router');
const { jwt } = require('../utils/auth');
const Bookings = require('../schema/bookings.js');
const Users = require('../schema/users.js');
const Movies = require('../schema/movies.js');
const { token_provided, verifyToken } = require('../validator/tokenValidator');
const { check_user } = require('../validator/RoleValidator.js');
const { validateSeatData, validateBookingData } = require('../validator/bookingValidator.js');

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: APIs related to movie bookings
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - seats
 *       properties:
 *         seats:
 *           type: number
 *       example:
 *         seats: 3
 */

/**
 * @swagger
 * /bookings/postBooking/{id}:
 *   post:
 *     summary: Book a movie
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the movie to book
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       '201':
 *         description: New booking created
 *       '400':
 *         description: Invalid or incomplete booking data
 *       '401':
 *         description: Access denied or forbidden
 *       '404':
 *         description: Movie not found
 *       '500':
 *         description: Failed to create booking
 */
router.post('/postBooking/{id}', async (req, res) => {
    try {
        const movieId = req.params.id;
        const bookingData = req.body;
        const token = req.headers.authorization;

        if (!token_provided(token)) {
            return res.status(401).send({ message: "Access denied. Token not provided." });
        }

        const decodedToken = verifyToken(token);

        if (!decodedToken || !check_user(token)) {
            return res.status(403).send({ message: "Forbidden. Only users can perform this action." });
        }

        const movie = await Movies.findById(movieId);

        if (!validateBookingData(bookingData)) {
            return res.status(400).send({ message: "Booking data is incomplete. Please provide all required fields." });
        }

        if (!validateSeatData(bookingData.seats, movie.availableSeats)) {
            return res.status(400).send({ error: "Seats Not Available." });
        }

        const user = await Users.findOne({ username: decodedToken.username });
        const date = new Date();

        const newBookingData = {
            movie_id: movie._id,
            seatsBooked: bookingData.seats,
            totalPrice: bookingData.seats * movie.price,
            timestamp: date,
            user_id: user._id
        };

        if (!validateBookingData(newBookingData)) {
            return res.status(400).send({ message: "Booking data is incomplete or invalid." });
        }

        const newBooking = await Bookings.create(newBookingData);

        movie.availableSeats -= bookingData.seats;
        await movie.save();

        res.status(201).json({ message: "New booking created", booking_details: newBooking });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || "Failed to create booking" });
    }
});

/**
 * @swagger
 * /bookings/myBooking:
 *   get:
 *     summary: Retrieve all bookings of the user
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Retrieved all bookings successfully
 *       '401':
 *         description: Access denied or unauthorized
 *       '403':
 *         description: Forbidden. Only regular users can access their bookings
 *       '404':
 *         description: No bookings found for this user
 *       '500':
 *         description: Failed to get user's bookings
 */
router.get('/myBooking', async (req, res) => {
    try {
        const token = req.headers.authorization;

        if (!token_provided(token)) {
            return res.status(401).json({ error: "Access denied. Token not provided." });
        }

        const decodedToken = verifyToken(token);

        const user = await Users.findOne({ username: decodedToken.username });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!check_user(token)) {
            return res.status(403).json({ error: "Forbidden. Only regular users can access their bookings." });
        }

        const allBookings = await Bookings.find({ user_id: user._id });

        if (!allBookings || allBookings.length === 0) {
            return res.status(404).json({ message: "No bookings found for this user" });
        }

        return res.status(200).json({ message: "Retrieved all bookings successfully", booking_details: allBookings });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to get user's bookings" });
    }
});

/**
 * @swagger
 * /bookings/cancelBooking/{id}/:
 *   delete:
 *     summary: Cancel a booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the booking to cancel
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Booking cancelled successfully
 *       '401':
 *         description: Access denied or unauthorized
 *       '404':
 *         description: Booking not found
 *       '500':
 *         description: Failed to cancel booking
 */
router.delete("/cancelBooking/{id}/", async (req, res) => {
    try {
        const bookingId = req.params.id;
        const token = req.headers.authorization;

        if (!token_provided(token)) {
            return res.status(401).json({ error: "Access denied. Token not provided." });
        }

        const decodedToken = verifyToken(token);

        if (!decodedToken || !check_user(token)) {
            return res.status(401).json({ error: "Sorry, you're not authorized to cancel a booking." });
        }

        const booking = await Bookings.findOne({ _id: bookingId });

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        const user = await Users.findOne({ username: decodedToken.username });

        if (user._id.toString() !== booking.user_id.toString()) {
            return res.status(401).json({ error: "You're not authorized to cancel this booking." });
        }

        const movietoUpdate = await Movies.findById(booking.movie_id);
       
                // Update the movie available seats
                movietoUpdate.availableSeats += booking.seatsBooked;

                // Cancel the booking
                const cancelBooking = await Bookings.findByIdAndDelete(bookingId);
        
                // Update the records of movies
                const movieUpdate = await movietoUpdate.save();
        
                res.status(200).json({ message: 'Booking cancelled successfully' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Failed to cancel booking' });
            }
        });
        
        module.exports = router;
        