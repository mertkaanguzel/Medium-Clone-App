const jwt = require('jsonwebtoken');
require('dotenv').config();

async function serializeUser(user) {
    const token = jwt.sign(user, process.env.JWT_KEY);
    return token;
}

async function deserializeUser(token) {
    const user = jwt.verify(token, process.env.JWT_KEY);
    return user;
}

module.exports = {
    serializeUser,
    deserializeUser,
}