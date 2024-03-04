const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Bookings = require('../schema/bookings.js')
const Users = require('../schema/users.js')
const Movies = require('../schema/movies.js')

async function verifyUserRole(token) {
    try {
        // Check if the token exists
        if (!token) {
            throw new Error("Access denied. Token not provided.")
        }
        // Verify the token
        const decodedToken = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY)
        // Fetch the user role
        const role = decodedToken.role
        
        if (!role) {
            throw new Error("User not found")
        }
        // Check if the user has the role of "user"
        if (role !== 'user') {
            
            throw new Error("Forbidden. Only users can perform this action.")
        }
        return true// User has the role of "user"
    } catch (error) {
        throw error// Forward the error to the caller
    }
}

// Book a movie
router.post('/:movie_id', async (req, res) => {
    try {
        
        const movieId = req.params.movie_id
        const seats  = req.body.seats
        const token = req.headers.authorization // Extract the JWT token from the request headers
        // Verify if the user has the role of "user"
        await verifyUserRole(token)
        const movie = await Movies.findById(movieId)// Find the exiting movie
        
        // Verify the token
        const decodedToken = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY)

        // Proceed with creating the booking
        if((movie.availableSeats < 1 || movie.availableSeats < seats)){
            return res.status(400).send("Seats Not Avaialble.")
        }
        console.log(decodedToken.username)
        const user = await Users.findOne({username : decodedToken.username})
        console.log(user._id)
        const date = new Date()
        const newBooking = await Bookings.create({
            movie_id: movieId,
            seatsBooked: seats,
            totalPrice : seats * movie.price,
            timestamp : date.toISOString().split('T')[0],
            user_id: user._id // Assuming you store user ID in the booking
        })
        movie.availableSeats -= seats // Remove number of seats booked.
        const updateMovie = await movie.save() // Update the movie database

        // res.status(200).json({ message: 'Movie details updated'})
        res.status(201).json({ message: 'New booking created', booking_details: newBooking })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to create booking' })
    }
})

// Retrieve all the Bookings of the user
router.get('/:user_id', async(req, res) => {
    try {
        const user_id = req.params.user_id
        const token = req.headers.authorization // Extract the JWT token from the request headers
        const user = await Users.findById(user_id)
        // Verify if the user has the role of "user"
        await verifyUserRole(token)

        // Verify the token
        const decodedToken = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY)

        if(decodedToken.username !== user.username){
            res.status(401).send({ message : "You're not authorised."})
        }
        // Find all bookings of the user
        const allBookings = await Bookings.find({ user_id: user_id })
        console.log(allBookings)

        if (!allBookings || allBookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this user' })
        }

        res.status(200).json({ message: 'Retrieved All Bookings Successfully', booking_details: allBookings })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to get Users Bookings' })
    }
})

module.exports = router