const jwt = require("jsonwebtoken")
const jwtt = require("express-jwt")
const userModel = require("../models/userModel")


exports.userMiddleware = (req,res,next) => {
    const userId = req.token._id

    userModel.findById({_id: userId}).exec((err,user) => {
        if (err || !user)
            res.status(400).json({error: 'User not fout!'})
            
        req.profile = user

        next ()
    })
}

exports.adminMiddleware = (req,res,next) => {
    const userId = req.token._id

    userModel.findById({_id: userId}).exec((err,user) => {
        if (err || !user)
            res.status(400).json({error: 'User not found!'})

        if (user.role !== 1)
            res.status(400).json({error: 'Admin resource. Request is danied.'})

        req.profile = user

        next ()
    })
}

exports.tokenMiddleware = (req,res,next) => {   

    const tokenVerified = jwt.verify(
        req.headers.authorization.split(' ')[1],
        process.env.JWT_SECRET
    )

    req.token = tokenVerified

    next ()

}