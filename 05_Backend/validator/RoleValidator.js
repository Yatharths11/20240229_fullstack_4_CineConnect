    //import internal dependencies
    const {token_provided, verifyToken} = require('./tokenValidator.js')
    // const decoded = require('../utils/utility.js')

    //send the token to another function
    //function return decoded token
    //check SuperAdmin
    function check_superAdmin(token) {

        //token Role compare with admin role
        const decodedToken = verifyToken(token)
        //token Role compare with admin role
        if (decodedToken.role === "superAdmin") {
            return true
        }
        return false 
    }

    //check Admin
    function check_admin(token) {
        //token Role compare with admin role
        const decodedToken = verifyToken(token)
        //token Role compare with admin role
        if (decodedToken.role === "admin") {
            return true
        }
        return false 
    }

    //check user
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
