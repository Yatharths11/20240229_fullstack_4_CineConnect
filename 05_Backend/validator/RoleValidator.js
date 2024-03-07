//import internal dependencies
const {verifyToken} = require('./tokenValidator.js')
// const decoded = require('../utils/utility.js')

/**
 * Function check role of token holder is superAdmin or not. 
 * @param {String} token - Token generated for validations
 * @returns {boolean} 
 */
function check_superAdmin(token) {

    //token Role compare with admin role
    const decodedToken = verifyToken(token)
    //token Role compare with admin role
    if (decodedToken.role === "superAdmin") {
        return true
    }
    return false 
}

/**
 * Function check role of token holder is Admin or not. 
 * @param {String} token - Token generated for validations
 * @returns {boolean} 
 */
function check_admin(token) {
    //token Role compare with admin role
    const decodedToken = verifyToken(token)
    //token Role compare with admin role
    if (decodedToken.role === "admin") {
        return true
    }
    return false 
}

/**
 * Function check role of token holder is User or not. 
 * @param {String} token - Token generated for validations
 * @returns {boolean} 
 */
function check_user(token) {
    //token Role compare with user role
    const decodedToken = verifyToken(token)
    //token Role compare with user role
    if (decodedToken.role === "user") {
        return true
    }
    return false    
}

//exporting module
module.exports = { check_superAdmin, check_admin, check_user }
