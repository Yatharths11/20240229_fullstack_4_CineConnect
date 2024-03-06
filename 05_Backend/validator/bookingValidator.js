const mongoose = require('mongoose');

const validateSeatData = (seatsRequested, seatsAvailable) => {
    // Check if the requested number of seats is within the available range
    if (seatsRequested < 1 || seatsRequested > seatsAvailable) {
        return false
    }
    return true;
}

const validateBookingData = (data) => {
    // Check if the required fields are present in the booking data
    console.log(data)
    if (!data.movie_id || !data.seatsBooked || !data.timestamp || !data.user_id) {
        
        return false;
    }

    // Check if movie_id and user_id are valid ObjectIDs
    if (!mongoose.Types.ObjectId.isValid(data.movie_id) || !mongoose.Types.ObjectId.isValid(data.user_id)) {
        return false;
    }

    // Check if seatsBooked is a number and timestamp is a Date
    if (typeof data.seatsBooked !== 'number' || !(data.timestamp instanceof Date)) {
        return false;
    }

    return true;
};
module.exports = { validateSeatData, validateBookingData }