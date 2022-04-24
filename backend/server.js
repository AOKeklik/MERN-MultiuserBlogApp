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
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const tagRoutes = require('./routes/tagRoutes')
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use(categoryRoutes)
app.use(tagRoutes)

console.log(process.env.PORT)

app.listen(process.env.PORT, () => console.log('Server Done!'))