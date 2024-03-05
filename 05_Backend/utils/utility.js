const { jwt, bcrypt } = require('./auth')

async function hashPassword(password) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt)
}

async function verifyPassword(user, password) {
    return await bcrypt.compare(password, user.password)
}

function decodeToken(token) {
    const decodedtoken = token.split(' ')[1]
    return jwt.verify(decodedtoken, process.env.SECRET_KEY)
}

module.exports = { hashPassword, verifyPassword, decodeToken }