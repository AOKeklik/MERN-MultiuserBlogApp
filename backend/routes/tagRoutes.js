const express = require('express')
const { tagValidator } = require('../validators/tagValidators')
const runValidator = require('../validators')
const { tokenMiddleware, adminMiddleware } = require('../middlewares/authMiddlewares')
const { 
    createTagController, 
    fetchTagsController, 
    fetchTagController, 
    removeTagController,
} = require('../controllers/tagControllers')

const tagRoutes = express.Router()

tagRoutes.post('/tag', tagValidator, runValidator, tokenMiddleware, adminMiddleware, createTagController)
tagRoutes.get('/tags', fetchTagsController)
tagRoutes.get('/tag/:slug', fetchTagController)
tagRoutes.delete('/tag/:slug', tokenMiddleware, adminMiddleware, removeTagController)

module.exports = tagRoutes