const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const cookieparser = require('cookie-parser')
require('dotenv').config()

mongoose.connect(process.env.DB_LOCAL).then(res => console.log('res..')).catch(err => console.log(err))

const app = express()

app.use(morgan('dev'))
app.use(express.json({limit: '20mb'}))
app.use(express.urlencoded({extended: true}))
app.use(cookieparser())

if (process.env.NODE_ENV === 'development')
    app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))


const authRoutes = require('./routes/authRoutes')
app.use('/auth', authRoutes)

app.listen(process.env.PORT, () => console.log('Server Done!'))