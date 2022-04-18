exports.read = (req,res) => {
    req.profile.hashed_password = undefined
    res.status(200).json({profile: req.profile})
}