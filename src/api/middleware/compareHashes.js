const bcrypt = require('bcryptjs')


const compareHashes = (password, userHash) => {
    return bcrypt.compare(password, userHash)
}