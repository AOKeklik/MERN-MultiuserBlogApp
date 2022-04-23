const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        max: 32,
    },
    slug: {
        type: String,
        unique: true,
        index: true,
    }
},{timestamps: true})

const categoryModel = new mongoose.model('category', categorySchema)

module.exports = categoryModel