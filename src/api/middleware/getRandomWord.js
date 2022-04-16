const wordlist = require('../wordlist');
const randomNumGen = require('./rng')

function getRandomWord() {
    return wordlist[randomNumGen(0, wordlist.length)]
}
module.exports = getRandomWord