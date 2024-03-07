const mongoose = require('mongoose')

/**
 * Function check if we movie have available number of seats for booking or not.
 * @param {number} seatsRequested 
 * @param {number} seatsAvailable 
 * @returns {boolean} Return true if we have seats available for booking, else false.
 */
const validateSeatData = (seatsRequested, seatsAvailable) => {
    // Check if the requested number of seats is within the available range
    if (seatsRequested < 1 || seatsRequested > seatsAvailable) {
        return false
    }
    return true
}

/**
 * Function check if provided data is available and in right format for booking.
 * @param {Object} data - It holds data required for booking a movie 
 * @returns {boolean} - Return true if data is provided and in right format , else false
 */
const validateBookingData = (data) => {
    // Check if the required fields are present in the booking data
    if (!data.movie_id || !data.seatsBooked || !data.timestamp || !data.user_id) {
        return false
    }

    // Check if movie_id and user_id are valid ObjectIDs
    if (!mongoose.Types.ObjectId.isValid(data.movie_id) || !mongoose.Types.ObjectId.isValid(data.user_id)) {
        return false
    }

    // Check if seatsBooked is a number and timestamp is a Date
    if (typeof data.seatsBooked !== 'number' || !(data.timestamp instanceof Date)) {
        return false
    }

    return true
}
module.exports = { validateSeatData, validateBookingData }