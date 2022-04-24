const {check} = require('express-validator')

exports.signupValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required!')
        .isLength({max: 32})
        .withMessage('Name must be no more than 32 characters long!'),
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address!'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long!')
]

exports.signinValidator = [
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address!'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long!')
]
