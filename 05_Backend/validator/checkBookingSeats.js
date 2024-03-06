const validateSeatData = (seatsRequested, seatsAvailable) => {
    // Check if the requested number of seats is within the available range
    if (seatsRequested < 1 || seatsRequested > seatsAvailable) {
        return false
    }
    return true;
}

const validateBookingData = (data) => {
    // Check if the required fields are present in the booking data
    // console.log(data.seats)
    if (!data.seats) {
        return false
    }

    return true
}

module.exports = {validateSeatData,validateBookingData}