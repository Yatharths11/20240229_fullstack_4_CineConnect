const { decode } = require("punycode");
const { jwt } = require("../utils/auth");
require("dotenv").config();

/**
 * Function to verify weather toke exists or not
 * @param {string} token
 * @returns
 */
function token_provided(token) {
  if (!token) {
    return false;
  } else {
    return true;
  }
}
function verifyToken(token) {
  console.log(token)
  token = token.split(" ")[1]  
  try {
    const decodetoken = token; // remove 'Bearer' from token
    const decode= jwt.verify(decodetoken, process.env.SECRET_KEY);
    // console.log("valid"+decode.role);
    return decode;
  } catch (err) {
    console.error(err);
    return false;
  }
}

module.exports = { token_provided, verifyToken };
