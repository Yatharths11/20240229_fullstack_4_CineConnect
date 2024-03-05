//import external dependencies
const { jwt, bcrypt } = require('../utils/auth')
//import internal dependencies
const tokenValidator = require('./tokenValidator.js')
const decoded = require('../utils/utility.js')


//send the token to another function
//function return decoded token




//check SuperAdmin
function check_superAdmin(token) {

    if (tokenValidator.verifyToken(token)) {

       const decodedToken = decoded.decodeToken(token)


        //token Role compare with user role
        if (decodedToken.role === "superAdmin") {

            return true

        } else {

            return false
        }

    }
}

//check Admin

function check_admin(token) {

    //token Role compare with user role

    if (tokenValidator.verifyToken(token)) {

        const decodedToken = decoded.decodeToken(token)


        //token Role compare with user role
        if (decodedToken.role === "admin") {

            return true

        } else {

            return false
        }

    }


}

//check user
function check_user(token) {

    //token Role compare with user role

    if (tokenValidator.verifyToken(token)) {

        const decodedToken = decoded.decodeToken(token)


        //token Role compare with user role
        if (decodedToken.role === "user") {

            return true

        } else {

            return false
        }

    }


}




//exporting module



module.exports = { check_superAdmin, check_admin, check_user }