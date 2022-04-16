const express = require('express')
const router = express.Router();
const getRandomWord = require('../middleware/getRandomWord')

router.get('/getNewWord', (req, res) => {
    let word = getRandomWord();
    res.json({word})
})
module.exports = router