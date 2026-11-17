const jwt = require('jsonwebtoken')

const setUser = (user)=>{
    console.log(user)
    return jwt.sign(
        {id : user},
        process.env.JWT_KEY,
        {expiresIn : "1d"})
}

const getUser = (token) => {
    return jwt.verify(token,process.env.JWT_KEY)
}


module.exports = {setUser,getUser}