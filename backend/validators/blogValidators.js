const { check } = require("express-validator")

exports.blogValidator = [
	check("title")
		.not()
		.isEmpty()
		.withMessage("title is required!")
		.isLength({ max: 32 })
		.withMessage("title must be no more than 32 characters long!"),
	check("body").not().isEmpty().withMessage("body is required!"),
]
