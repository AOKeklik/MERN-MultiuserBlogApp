const mongoose = require("mongoose")
const slugify = require("slugify")
const formidable = require("formidable")
const stripHtml = require("string-strip-html")
const fs = require("fs")
const _ = require("lodash")
const blogModel = require("../models/blogModel")
const categoryModel = require("../models/categoryModel")
const tagModel = require("../models/tagModel")
const { errorHandler } = require("../helpers/dbErrorHandler")
const { smartTrim } = require("../helpers/blogHelpers")

exports.createBlogController = (req, res) => {
	let form = new formidable.IncomingForm()
	form.keepExtensions = true
	form.parse(req, (err, fields, files) => {
		if (err) return res.status(400).json({ error: "Image could not upload!" })

		const { title, body, categories, tags } = fields

		if (!title || !title.length)
			return res.status(400).json({ error: "Title is required!" })
		if (!body || body.length < 200)
			return res.status(400).json({ error: "Content is too short!" })
		if (!categories || categories.length == 0)
			return res
				.status(400)
				.json({ error: "At least one Category is required!" })
		if (!tags || tags.length == 0)
			return res.status(400).json({ error: "At least one Tag is required!" })

		let blog = new blogModel()
		blog.title = title
		blog.slug = slugify(title, { trim: true, lower: true })
		blog.body = body
		blog.excerpt = smartTrim(body, 320, " ", " ...")
		blog.mtitle = `${title} | ${process.env.APP_NAME}`
		blog.mdesc = stripHtml(body.substring(0, 160))
		blog.postedBy = req.profile._id

		let tempCategories = categories && categories.split(",")
		let tempTags = tags && tags.split(",")

		for (let n of tempCategories.concat(tempTags)) {
			if (!mongoose.Types.ObjectId.isValid(n))
				return res.status(400).json({ error: "Id is not valid!" })
		}

		blog.categories = tempCategories
		blog.tags = tempTags

		if (files.photo) {
			if (files.photo.size > 10000000)
				return res
					.status(400)
					.json({ error: "Image should be less than 1mb in size!" })

			blog.photo.contentType = files.photo.mimetype
			blog.photo.data = fs.readFileSync(files.photo.filepath)
		}

		blog.save((err, result) => {
			if (err) return res.status(400).json({ error: errorHandler(err) })

			return res.status(200).json(result)

			// blogModel
			// 	.findByIdAndUpdate(
			// 		result._id,
			// 		{ $push: { categories: tempCategories } },
			// 		{ new: true }
			// 	)
			// 	.exec((err, result) => {
			// 		if (err) return res.status(400).json({ error: errorHandler(err) })
			// 		else
			// 			blogModel
			// 				.findByIdAndUpdate(
			// 					result._id,
			// 					{ $push: { tags: tempTags } },
			// 					{ new: true }
			// 				)
			// 				.exec((err, result) => {
			// 					if (err)
			// 						return res.status(400).json({ error: errorHandler(err) })
			// 					else return res.status(200).json(result)
			// 				})
			// 	})
		})
	})
}
exports.fetchBlogsController = (req, res) => {
	return res.status(200).json({ message: "Done!" })
}
