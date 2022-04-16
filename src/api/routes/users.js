const express = require('express');
const generateUserID = require('../middleware/generateUserID');
const router = express.Router();
const User = require('../models/users')
const compareHash = require('../middleware/compareHashes')
const hashpswd = require('../middleware/hashPassword')

router.post('/login', async (req, res)=> {
    try {
        const user = await User.findOne({email: req.body.email});
        console.log(user)
        if (user) {
            const comparison = await compareHash(req.body.password, user.password)
            if (comparison) {
                res.status(200).send("Login Successful")
            } else {
                res.status(401).send("Wrong Username or Password")
            }
        } else {
            res.status(401).send("Wrong Username or Password")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
})

router.post('/register', async (req, res) => {
    var username = req.body.username
    var email = req.body.email
    var password = req.body.password

    var newUser = new User;
    newUser.username = username
    newUser.email = email
    newUser.password = hashpswd(password, process.env.SALT_ROUNDS)
    newUser.uid = generateUserID
    await newUser.save((err, savedUser) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err);
        } 
        return res.status(201).send(savedUser);
    })

})
router.post('/updateScore', async(req, res) => {
    var username = req.body.username
    var newScore = req.body.newScore

    try {
        const user = User.findOne({username: username})
        if (user) {
            if (user.score < newScore) {
                user.score = user.score + newScore
                const savedUsr = await user.save();
                res.status(200).send(savedUsr)
            } else {
                res.status(401).send("unable to update score")
            }
        } else {
            res.status(404).send("user not found")
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
        
    }
})
module.exports = router;