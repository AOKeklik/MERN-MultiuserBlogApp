const express = require('express')
const {read} = require('../controllers/userControllers')
const {tokenMiddleware, adminMiddleware} = require('../middlewares/authMiddlewares')

const userRoutes = express.Router()

userRoutes.get('/profile', tokenMiddleware, adminMiddleware, read)

module.exports = userRoutes