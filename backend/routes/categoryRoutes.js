const express = require('express')
const runValidator = require('../validators')
const {categoryValidator} = require('../validators/categoryValidator')
const {tokenMiddleware, adminMiddleware} = require('../middlewares/authMiddlewares')
const {
    createCategoryController,
    featchCategoriesController,
    fetchCategoryController,
    removeCategoryController,
} = require('../controllers/categoryControllers')

const categoryRoutes = express.Router()

categoryRoutes.post('/category', categoryValidator, runValidator, tokenMiddleware, adminMiddleware, createCategoryController)
categoryRoutes.get('/categories', featchCategoriesController)
categoryRoutes.get('/category/:slug', fetchCategoryController)
categoryRoutes.delete('/category/:slug', tokenMiddleware, adminMiddleware, removeCategoryController)

module.exports = categoryRoutes