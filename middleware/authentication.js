const {getUser} = require('../services/jwt')

const checkAuth = (req,res,next) => {
    const token = req.cookies?.token
    if(!token) return res.status(400).json({
        message:'Please login first'
    })

    const user = getUser(token)
    //console.log(user)
    req.user = user
    //console.log(req.user)

    next()
}

module.exports = checkAuth