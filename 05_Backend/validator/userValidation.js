// validation.js

// Function to validate username
function isValidUsername(username) {
    // Regular expression to check if username contains only letters, numbers, underscores, and hyphens
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/
    return usernameRegex.test(username)
}

// Function to validate email
function isValidEmail(email) {
    // Regular expression to check if email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

// Function to validate password
function isValidPassword(password) {
    // Password must be at least 6 characters long
    return password.length >= 6
}

module.exports = {
    isValidUsername,
    isValidEmail,
    isValidPassword
}


