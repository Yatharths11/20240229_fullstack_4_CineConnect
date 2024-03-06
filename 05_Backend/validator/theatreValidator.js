const typeCheck = (theatreData) => {
    // Validate name (only alphabetic characters)
    const nameRegex = /^[a-zA-Z]+$/
    if (!nameRegex.test(theatreData.name)) {
        return false
    }

    // Validate address (all strings)
    if (typeof theatreData.address.street !== 'string' || typeof theatreData.address.area !== 'string' || typeof theatreData.address.city !== 'string') {
        return false
    }

    return true
}

const validateTheatrePost = (theatreData) => {
    // Check if theatreData is provided
    if (!theatreData.name || !theatreData.address) {
        return false
    }

    // Check data type
    if (!typeCheck(theatreData)) {
        return false;
    }

    return true
}

const validateTheatreUpdate = (theatreData) => {
    // Check if theatreData is provided
    if (!(theatreData.name || theatreData.address)) {
        return false
    }

    // Check data type
    if (!typeCheck(theatreData)) {
        return false;
    }
    
    return true
}

module.exports = { validateTheatrePost, validateTheatreUpdate }