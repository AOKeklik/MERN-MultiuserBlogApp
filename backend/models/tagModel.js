const mongoose = require('mongoose')

const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
    },
    slug: {
        type: String,
        unique: true,
        index: true,
    }
}, {timestamps: true})

const TagModel = new mongoose.model('tag', TagSchema)

module.exports = TagModel