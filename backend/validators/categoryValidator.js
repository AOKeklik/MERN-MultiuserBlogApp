const {check} = require('express-validator')

exports.categoryValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required!')
        .isLength({max: 32})
        .withMessage('Name must be no more than 32 characters long!'),
]