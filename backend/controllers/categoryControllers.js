const categoryModel = require('../models/categoryModel')
const slugify = require('slugify')
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.createCategoryController = (req,res) => {
    const {name} = req.body
    const slug = slugify(name, {
        lower: true,
        trim: true,
    })

    categoryModel({name, slug})
    .save((err,data) => {
        if (err)
            return res.status(400).json({error: errorHandler(err)})

        res.status(200).json(data)  
    })
}
exports.featchCategoriesController = (req,res) => {
    categoryModel.find().exec((err,data) => {
        if (err || !data) 
            return res.status(400).json({error: errorHandler(err)})

        res.status(200).json(data)
    })
}
exports.fetchCategoryController = (req,res) => {
    const slug = req.params.slug.toLowerCase()

    categoryModel.findOne({slug}).exec((err,category) => {
        if (err || !category)
            res.status(400).json({error: errorHandler(err)})

        res.status(200).json([category,slug])
    })
}
exports.removeCategoryController = (req,res) => {
    const slug = req.params.slug.toLowerCase()

    categoryModel.findOneAndRemove({slug}).exec((err,category) => {
        if (err || !category)
            return res.status(400).json({error: errorHandler(err)})

        res.status(200).json({message: `${category.slug} category is deleted successfully..`})
    })
}