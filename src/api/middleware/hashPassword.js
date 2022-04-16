const bcrypt = require("bcryptjs");

const hashPassword = (password, saltRounds) => {
    return bcrypt.hash(password, saltRounds)
}

module.exports = hashPassword