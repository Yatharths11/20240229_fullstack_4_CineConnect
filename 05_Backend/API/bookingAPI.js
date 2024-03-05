const router = require('../utils/router');
const { jwt } = require('../utils/auth')
const Bookings = require('../schema/bookings.js')
const Users = require('../schema/users.js')
const Movies = require('../schema/movies.js')
const { token_provided, verifyToken } = require('../validator/tokenValidator')
const { check_user } = require('../validator/checkRole')


// Book a movie
router.post('/post/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        const seats = req.body.seats;
        const token = req.headers.authorization;
        // console.log(token)
        if (!token_provided(token)) {
            return res.status(401).send({ message: "Access denied. Token not provided." });
        }

        const decodedToken = verifyToken(token)
        if (!decodedToken || !check_user(token)) {
            // console.log("verify hoagaya2")
            return res.status(403).send({ message: "Forbidden. Only users can perform this action." })
        }

        const movie = await Movies.findById(movieId)
        
        if (movie.availableSeats < 1 || movie.availableSeats < seats) {
            return res.status(400).send({ error: "Seats Not Available." })
        }
        
        const user = await Users.findOne({ username: decodedToken.username })
        const date = new Date()
        console.log(date.toISOString().split('T')[0])
        const newBooking = await Bookings.create({
            movie_id: movieId,
            seatsBooked: seats,
            totalPrice: seats * movie.price,
            timestamp: date.toISOString().split('T')[0],
            user_id: user._id
        });

        movie.availableSeats -= seats
        await movie.save()

        res.status(201).json({ message: "New booking created", booking_details: newBooking })
    } catch (error) {
        console.error(error)
        res.status(error.status || 500).json({ error: error.message || "Failed to create booking" })
    }
})


// Retrieve all the Bookings of the user
router.get('/myBooking', async (req, res) => {
    try {
        const token = req.headers.authorization // Extract the JWT token from the request headers
        console.log(token)
        // Check if the JWT token is provided
        if (!token_provided(token)) {
            return res.status(401).json({ error: "Access denied. Token not provided." })
        }
        // Verify the token and extract the decoded token
        const decodedToken = verifyToken(token)
        // Find the user associated with the token
        const user = await Users.findOne({ username: decodedToken.username })
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        // Check if the user is admin or superadmin
        if (check_admin(token) || check_superAdmin(token)) {
            return res.status(403).json({ error: "Forbidden. Only regular users can access their bookings." })
        }
        // Find all bookings of the user
        const allBookings = await Bookings.find({ user_id: user._id })
        // Check if bookings exist for the user
        if (!allBookings || allBookings.length === 0) {
            return res.status(404).json({ message: "No bookings found for this user" })
        }
        // Return the bookings of the user
        return res.status(200).json({ message: "Retrieved all bookings successfully", booking_details: allBookings })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Failed to get user's bookings" })
    }
});

// Cancel a booking
router.delete("/:id/cancel", async(req,res) => {
    try{
        const bookingId = req.params.id
        console.log(bookingId)
        const token = req.headers.authorization // Extract the JWT token from the request headers
        const booking = await Bookings.findOne({_id : bookingId})
        console.log(booking)
        // Verify if the user has the role of "user"
        await verifyUserRole(token)
        // Verify the token
        const decodedToken = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY)
        const user = await Users.findOne({username : decodedToken.username})
        console.log(booking.user_id)
        if(user._id.toString() !== booking.user_id.toString()){
            return res.status(401).send({ error : "You're not Authorised to Cancel the Booking."})
        }
        //Logic Pending for Cancelling booking based on Dates
        const movietoUpdate = await Movies.findById(booking.movie_id)
        movietoUpdate.availableSeats += await booking.seatsBooked // Update the movie available seats
        const cancelBooking = await Bookings.findByIdAndDelete(bookingId)// Cancel the booking
        const movieUpdate = await movietoUpdate.save() // Update the records of movies
        res.status(200).json({ message: 'Booking Cancelled Successfully'})
    }
    catch(error){
        console.log(error)
        res.status(500).json({ error: 'Failed to Cancel Bookings' })
    }
} )
module.exports = router