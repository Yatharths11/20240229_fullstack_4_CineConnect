const validateTheatreData = (theatreData) => {
    // Check if theatreData is provided
    if (!theatreData || !theatreData.name || !theatreData.location) {
        return false
    }

    return true
}

module.exports = { validateTheatreData }