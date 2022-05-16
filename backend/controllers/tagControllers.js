const tagModel = require("../models/tagModel")
const slugify = require("slugify")
const { errorHandler } = require("../helpers/dbErrorHandler")

exports.createTagController = (req, res) => {
	const name = req.body.name
	const slug = slugify(name, {
		trim: true,
		lower: true,
	})

	new tagModel({ name, slug }).save((err, data) => {
		if (err) return res.status(400).json({ error: errorHandler(err) })

		res.status(200).json(data)
	})
}

exports.fetchTagsController = (req, res) => {
	tagModel.find().exec((err, data) => {
		if (err || data.length === 0)
			return res.status(400).json({ error: errorHandler(err) })

		res.status(200).json(data)
	})
}

exports.fetchTagController = (req, res) => {
	const slug = req.params.slug.toLowerCase()

	tagModel.find({ slug }).exec((err, data) => {
		if (err || data.length === 0)
			return res.status(400).json({ error: "The tag is not found!" })

		res.status(200).json(data)
	})
}

exports.removeTagController = (req, res) => {
	const slug = req.params.slug.toLowerCase()

	tagModel.findOneAndDelete({ slug }).exec((err, data) => {
		if (err || !data)
			return res.status(400).json({ error: "The tag is not found!" })

		res.status(200).json(data)
	})
}
