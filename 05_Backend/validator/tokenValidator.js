const { jwt, bcrypt } = require('../utils/auth')
require('dotenv').config()

/**
 * Function to verify weather toke exists or not
 * @param {string} token 
 * @returns 
 */
function token_provided(token){
    const decodedtoken = token.split(' ')[1]
    // console.log(decodedtoken)
    if(decodedtoken === null || decodedtoken === undefined){
        return  false;
    }
    return true;

}

/**
 * verifying token and returning user data from it.
 * @param {token} token 
 * @returns 
 */
function verifyToken(token) {

    if(!token_provided(token)){
        return res.status(400).send({message : "Token missing"})
    }
    const decodedtoken = token.split(' ')[1]
    // console.log(decodedtoken)
    // console.log(jwt.verify(decodedtoken, process.env.SECRET_KEY))
    return jwt.verify(decodedtoken, process.env.SECRET_KEY)
    
    
}

module.exports = {token_provided,verifyToken}