const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
const mongoose = require("mongoose")

exports.adminMiddleware = (req, res, next) => {
	const userId = req.token._id

	if (!mongoose.Types.ObjectId.isValid(userId))
		return res.status(400).json({ error: "Id not valid!" })

	userModel.findById({ _id: userId }).exec((err, user) => {
		if (err || !user) return res.status(400).json({ error: "User not found!" })

		if (user.role !== 1)
			return res
				.status(400)
				.json({ error: "Admin resource. Request is danied!" })

		req.profile = user

		next()
	})
}

exports.userMiddleware = (req, res, next) => {
	const userId = req.token._id

	if (!mongoose.Types.ObjectId.isValid(userId))
		return res.status(400).json({ error: "Id not valid!" })

	userModel.findById({ _id: userId }).exec((err, user) => {
		if (err || !user) return res.status(400).json({ error: "User not fout!" })

		req.profile = user

		next()
	})
}

exports.tokenMiddleware = (req, res, next) => {
	const token = req.headers.authorization

	if (!token) return res.status(400).json({ error: "Token not found!" })

	jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, token) => {
		if (err) return res.status(400).json({ error: "Wrong token value!" })
		else req.token = token
	})

	next()
}
