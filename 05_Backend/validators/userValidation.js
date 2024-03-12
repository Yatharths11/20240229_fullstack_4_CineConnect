// validation.js

/**
 * Function to validate username
 * @param {String} username -  Take username for validation
 * @returns {boolean}
 */
function isValidUsername(username) {
  // Regular expression to check if username contains only letters, numbers, underscores, and hyphens
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  return usernameRegex.test(username);
}

/**
 * Function to validate email
 * @param {String} email - Take email for validation.
 * @returns
 */
function isValidEmail(email) {
  // Regular expression to check if email format is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Function to validate password
 * @param {password} password - Take password for validation.
 * @returns
 */
function isValidPassword(password) {
  // Password must be at least 6 characters long
  return password.length >= 6;
}

module.exports = {
  isValidUsername,
  isValidEmail,
  isValidPassword,
};
