//import external
const { ObjectId } = require('mongodb');

//import internal 
const Users = require("../schema/users.js")


/**
 * Function to validate MogoDB ObjectId
 * @param {*} id 
 * @returns 
 */
async function isValidObjectId(id) {

    // Check if the ID exists in the user collection
    const user = await Users.findOne({ _id: new ObjectId(id) })

    if (user) {
        console.log("ID exists in the User:", user)
        return true
    } else {
        console.log("ID does not exist in the User")
        return false
    }

}

module.exports = { isValidObjectId }