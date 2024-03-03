const mongoose = require('mongoose')

// Schema for Booking
const bookingSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    seatsBooked: {
        type: Number,
        min: 1,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 50
    }
})

module.exports = mongoose.model('Booking', bookingSchema)