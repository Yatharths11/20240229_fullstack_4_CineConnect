/**
 * Function check if the data in Object is in right format or not.
 * @param {Object} theatreData - Take a threate Data Object for Validations
 * @returns {boolean}
 */
const typeCheck = (theatreData) => {
  // Validate name (only alphabetic characters)
  const nameRegex = /^[a-zA-Z]+$/;
  if (!nameRegex.test(theatreData.name)) {
    return false;
  }

  // Validate address (all strings)
  if (
    typeof theatreData.address.street !== "string" ||
    typeof theatreData.address.area !== "string" ||
    typeof theatreData.address.city !== "string"
  ) {
    return false;
  }

  return true;
};

/**
 * Function check if data for posting is valid or not.
 * @param {Object} theatreData - Take threatre data for validation while posting new theatre.
 * @returns
 */
const validateTheatrePost = (theatreData) => {
  // Check if theatreData is provided
  if (!theatreData.name || !theatreData.address) {
    return false;
  }

  // Check data type
  if (!typeCheck(theatreData)) {
    return false;
  }

  return true;
};

/**
 * Function check if data for updating is valid or not.
 * @param {Object} theatreData
 * @returns
 */
const validateTheatreUpdate = (theatreData) => {
  // Check if theatreData is provided
  if (!(theatreData.name || theatreData.address)) {
    return false;
  }

  // Check data type
  if (!typeCheck(theatreData)) {
    return false;
  }

  return true;
};

module.exports = { validateTheatrePost, validateTheatreUpdate };
