const Users = require('../schema/users')
const { check_user } = require('../validator/checkRole')
const { token_provided, verifyToken } = require('../validator/tokenValidator')
const { hashPassword, decodeToken } = require('../utils/utility')


async function validateRegistration(username, email, password) {
    let flag = true
    if (!password) {
        flag = false
        return { status: 400, error: "Password is required." }
        return res.status(400).json({ error: "Password is required." })
    }
    // Check if username and email already exist
    const usernameExist = await Users.findOne({ username: username })
    const emailExist = await Users.findOne({ email: email })

    if (usernameExist) {
        flag = false
        return { stauts: 401, error: "Username already exists. Please try another Username." }
        //return res.status(401).json({ error: "Username already exists. Please try another Username." })
    }

    if (emailExist) {
        flag = false
        return { status: 401, error: "Email already exists. Please try another email." }
        // return res.status(401).json({ error: "Email already exists. Please try another email." })
    }
    return true
}

async function validateUser(id, token) {
    if (!token_provided(token)) {
        return { status: 401, error: "Access denied. Token not provided." }
        // return res.status(401).send({ error: "Access denied. Token not provided." })
    }

    const decodedToken = await verifyToken(token)

    if (!decodedToken || !check_user(token)) {
        return { status: 403, error: "Forbidden. Only users can perform this action." }
        // return res.status(403).send({ message: "Forbidden. Only users can perform this action." })
    }

    const userExist = await Users.findOne({ _id: id })

    if (!userExist) {
        return { status: 404, error: "User not Found." }
        // return res.status(404).send({ error: "User not Found." })
    }

    if (!(decodedToken.username === userExist.username) || !decodedToken.role === 'superAdmin') {
        return { status: 401, error: "Sorry, you're not Authorised." }
        // return res.status(401).send({ error: "Sorry, you're not Authorised." })
    }
}


module.exports = { validateRegistration, validateUser }