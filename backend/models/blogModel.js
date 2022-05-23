const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 160,
		},
		slug: {
			type: String,
			unique: true,
			index: true,
		},
		body: {
			type: Object,
			required: true,
			minlength: 200,
			maxlength: 2000000,
		},
		excerpt: {
			type: String,
			maxlength: 1000,
		},
		mtitle: String,
		mdesc: String,
		photo: {
			contentType: String,
			data: Buffer,
		},
		postedBy: { type: mongoose.Schema.ObjectId, required: true, ref: "user" },
		categories: [
			{ type: mongoose.Schema.ObjectId, required: true, ref: "category" },
		],
		tags: [{ type: mongoose.Schema.ObjectId, required: true, ref: "tag" }],
	},
	{ timestamps: true }
)

const blogModel = new mongoose.model("blog", blogSchema)

module.exports = blogModel
