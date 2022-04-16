const randomNumberGenerator = require("./rng");

const generateUserID = () => {
    return randomNumberGenerator(1000000,1999999)    
}
module.exports = generateUserID;