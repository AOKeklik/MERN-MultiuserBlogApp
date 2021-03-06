const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
        lowercase: true,
        unique: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    profile: {
        type: String,
        required: true,
    },
    hashed_password: {
        type: String,
        required: true,
    },
    salt: String,
    about: String,
    role: {
        type: Number,
        default: 0,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    resetPasswordLink: {
        data: String,
        default: ''
    }
}, {timestamps: true})

userSchema
    .virtual('password')
    .set(function (password) {
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password
    })

userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function (password) {
        if (!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ''
        }
    },  
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + ''
    }
}

const userModel = mongoose.model('user', userSchema)

module.exports = userModel