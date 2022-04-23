const express = require('express')
const runValidator = require('../validators')
const {categoryValidator} = require('../validators/authValidators')
const { 
    tokenMiddleware, 
    adminMiddleware 
} = require('../middlewares/authMiddlewares')
const {
    createCategoryController,
    featchCategoriesController,
    fetchCategoryController,
    removeCategoryController,
} = require('../controllers/categoryControllers')

const categoryRoutes = express.Router()

categoryRoutes.post('/', categoryValidator, runValidator, tokenMiddleware, adminMiddleware, createCategoryController)
categoryRoutes.get('/', featchCategoriesController)
categoryRoutes.get('/:slug', fetchCategoryController)
categoryRoutes.delete('/:slug', tokenMiddleware, adminMiddleware, removeCategoryController)

module.exports = categoryRoutes