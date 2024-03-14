// internal imports
const Bookings = require("../models/bookings.js");
const Users = require("../models/users.js");
const Movies = require("../models/movies.js");
const {
  token_provided,
  verifyToken,
} = require("../validators/tokenValidator.js");
const { check_user } = require("../validators/RoleValidator.js");
const {
  validateSeatData,
  validateBookingData,
} = require("../validators/bookingValidator.js");

// Book a movie
const postBooking = async (req, res) => {
  try {
    const movieId = req.params.id;
    const bookingData = req.body;
    const token = req.headers.authorization;
    if (!token_provided(token)) {
      return res
        .status(401)
        .send({ message: "Access denied. Token not provided." });
    }

    const decodedToken = verifyToken(token);
    if (!decodedToken || !check_user(token)) {
      return res
        .status(403)
        .send({ message: "Forbidden. Only users can perform this action." });
    }

    const movie = await Movies.findById(movieId);
    // console.log(bookingData)
    if (!validateBookingData(bookingData)) {
      return res.status(400).send({
        message:
          "Booking data is incomplete. Please provide all required fields.",
      });
    }
    if (!validateSeatData(seatsRequested, movie.availableSeats)) {
      return res.status(400).send({ error: "Seats Not Available." });
    }

    const user = await Users.findOne({ username: decodedToken.username });
    const date = new Date();

    const newBookingData = {
      movie_id: movie._id,
      seatsBooked: bookingData.seats,
      totalPrice: bookingData.seats * movie.price,
      timestamp: date,
      user_id: user._id,
    };

    if (!validateBookingData(newBookingData)) {
      return res
        .status(400)
        .send({ message: "Booking data is incomplete or invalid." });
    }
    if (!validateSeatData(bookingData.seats, movie.availableSeats)) {
      return res.status(400).send({ error: "Seats Not Available." });
    }

    const newBooking = await Bookings.create(newBookingData);

    movie.availableSeats -= bookingData.seats; // Update movies available seats
    await movie.save();

    res
      .status(201)
      .json({ message: "New booking created", booking_details: newBooking });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Failed to create booking" });
  }
};

// Retrieve all the Bookings of the user
const myBooking = async (req, res) => {
  try {
    const token = req.headers.authorization; // Extract the JWT token from the request headers
    // Check if the JWT token is provided
    if (!token_provided(token)) {
      return res
        .status(401)
        .json({ error: "Access denied. Token not provided." });
    }
    // Verify the token and extract the decoded token
    const decodedToken = verifyToken(token);
    // Find the user associated with the token
    const user = await Users.findOne({ username: decodedToken.username });
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Check if the user is admin or superadmin
    if (!check_user(token)) {
      return res.status(403).json({
        error: "Forbidden. Only regular users can access their bookings.",
      });
    }
    // Find all bookings of the user
    const allBookings = await Bookings.find({ user_id: user._id });
    // Check if bookings exist for the user
    if (!allBookings || allBookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }
    // Return the bookings of the user
    return res.status(200).json({
      message: "Retrieved all bookings successfully",
      booking_details: allBookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to get user's bookings" });
  }
};

// Cancel a booking
const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const token = req.headers.authorization; // Extract the JWT token from the request headers

    // Check if the JWT token is provided
    if (!token_provided(token)) {
      return res
        .status(401)
        .json({ error: "Access denied. Token not provided." });
    }

    // Verify the token
    const decodedToken = verifyToken(token);

    // Check if the user is authorized to cancel a booking
    if (!decodedToken || !check_user(token)) {
      return res
        .status(401)
        .json({ error: "Sorry, you're not authorized to cancel a booking." });
    }

    // Retrieve the booking
    const booking = await Bookings.findOne({ _id: bookingId });

    // Verify if the booking exists
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Retrieve the user based on the token
    const user = await Users.findOne({ username: decodedToken.username });

    // Check if the user is authorized to cancel this booking
    if (user._id.toString() !== booking.user_id.toString()) {
      return res
        .status(401)
        .json({ error: "You're not authorized to cancel this booking." });
    }

    // Logic for cancelling the booking based on dates (Pending)
    // Update the movie available seats
    const movietoUpdate = await Movies.findById(booking.movie_id);
    movietoUpdate.availableSeats += booking.seatsBooked;

    // Cancel the booking
    const cancelBooking = await Bookings.findByIdAndDelete(bookingId);

    // Update the records of movies
    const movieUpdate = await movietoUpdate.save();

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to cancel booking" });
  }
};

// exports
module.exports = { postBooking, myBooking, cancelBooking };
