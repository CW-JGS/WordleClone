require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json())
//mongoDB setup
mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('connected to database successfully') )
//middleWare
const userRouter = require('./routes/users')
const wordRouter = require('./routes/words')
app.use('/words', wordRouter)
app.use('/users', userRouter)


app.listen(process.env.PORT, ()=> {
    console.log(`API is live on http://localhost:${process.env.PORT}/`)
})