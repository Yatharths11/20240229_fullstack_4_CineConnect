const jwt = require('jsonwebtoken')

/**
 * Function to verify weather toke exists or not
 * @param {string} token 
 * @returns 
 */
function token_provided(token){
    if(!token){
        return  false;
    }else{
        return true;
    }
}


function verifyToken(token) {
    const secretKey = process.env.secretKey 

    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                // Token verification failed
                return false
            } else {
                // Token is valid, return the decoded payload
                return true
            }
        });
    });
}



/** this is how to use the verify token function
 * verifyToken(inputToken)
    .then(decoded => {
        console.log('Token is valid. Decoded payload:', decoded);
    })
    .catch(err => {
        console.error('Token verification failed:', err.message);
    });
 */
module.exports = {token_provided,verifyToken}