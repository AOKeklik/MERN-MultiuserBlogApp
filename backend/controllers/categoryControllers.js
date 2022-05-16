const categoryModel = require("../models/categoryModel")
const slugify = require("slugify")
const { errorHandler } = require("../helpers/dbErrorHandler")

exports.createCategoryController = (req, res) => {
	const { name } = req.body
	const slug = slugify(name, {
		lower: true,
		trim: true,
	})

	new categoryModel({ name, slug }).save((err, category) => {
		if (err) return res.status(400).json({ error: errorHandler(err) })

		return res.status(200).json({
			category,
			message: `${category.name} is created successfully..`,
		})
	})
}
exports.featchCategoriesController = (req, res) => {
	categoryModel.find().exec((err, data) => {
		if (err || !data) return res.status(400).json({ error: errorHandler(err) })

		return res.status(200).json(data)
	})
}
exports.fetchCategoryController = (req, res) => {
	const slug = req.params.slug.toLowerCase()

	categoryModel.findOne({ slug }).exec((err, category) => {
		if (err || !category)
			return res.status(400).json({ error: errorHandler(err) })

		return res.status(200).json([category, slug])
	})
}
exports.removeCategoryController = (req, res) => {
	const slug = req.params.slug.toLowerCase()

	categoryModel.findOneAndRemove({ slug }).exec((err, category) => {
		if (err || !category)
			return res.status(400).json({ error: errorHandler(err) })

		return res
			.status(200)
			.json({ message: `${category.name} is deleted successfully..` })
	})
}
