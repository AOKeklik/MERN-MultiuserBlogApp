const express = require('express')
const runValidator = require('../validators')
const {
    signupValidator, 
    signinValidator
} = require('../validators/authValidators')
const {
    signupController, 
    signinController,
    signoutController,
    testController,
} = require('../controllers/authControllers')

const authRoutes = express.Router()

authRoutes.post('/signup', signupValidator, runValidator, signupController)
authRoutes.post('/signin', signinValidator, runValidator, signinController)
authRoutes.get('/signout', signoutController)

module.exports = authRoutes