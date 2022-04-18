const userModel = require('../models/userModel')
const shortid = require('shortid')
const jwt = require('jsonwebtoken')

exports.signupController = (req,res) => {
    const {name, email, password} = req.body
    userModel.findOne({email}).exec((err,user) => {
        if (user) 
            return res.status(400).json({error: 'Email is taken!'})

        const username = shortid.generate()
        const profile = `${process.env.CLIENT_URL}/profile/${username}`

        const newUser = new userModel({username,name,email,password,profile})
        newUser.save((err,success) => {
            if (err)
                return res.status(400).json({error: err})
            
            return res.status(200).json({message: 'Signup success! Please signin!'})
        })
    })
} 

exports.signinController = (req,res) => {
    const {email,password} = req.body
    userModel.findOne({email}).exec((err,user) => {
        if (err || !user) 
            return res.status(400).json({error: 'User with that email does not exist. Please signup!'})

        if (!user.authenticate(password))
            return res.status(400).json({error: 'Email and Password do not match!'})

        const token = jwt.sign(
            {_id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )

        const {_id,username,name,email,role} = user
        return res.status(200).json({
            token,
            user: {_id,username,name,email,role}
        })
    })
}

exports.signoutController = (req,res) => {
    res.status(200).json({message: 'Signout success!'})
}

exports.testController = (req, res) => {
    try {
        const tok = req.headers.authorization.split(' ')[1]
        const token = jwt.decode(
            tok, 
            process.env.JWT_SECRET
        )
        res.status(200).json({user: token})
    } catch(err) {
        console.log(err)
    }
}