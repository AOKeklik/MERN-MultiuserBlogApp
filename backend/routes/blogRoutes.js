const express = require("express")
const {
	fetchBlogsController,
	createBlogController,
} = require("../controllers/blogControllers")
const {
	tokenMiddleware,
	userMiddleware,
} = require("../middlewares/authMiddlewares")
const runValidator = require("../validators")
const { blogValidator } = require("../validators/blogValidators")

const blogRoutes = express.Router()

blogRoutes.post("/blog", tokenMiddleware, userMiddleware, createBlogController)
blogRoutes.get("/blogs", fetchBlogsController)

module.exports = blogRoutes
