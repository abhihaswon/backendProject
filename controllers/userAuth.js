const pool = require('../connection')
const bcrypt = require('bcrypt');
const salt = 12
const {setUser} = require('../services/jwt');

const userSignUp = async(req,res,next) => {
    const {email,password} = req.body;
    const salt = 12;
    
    if(!email || !password) {return res.status(400).json({
        message:'Email and password are required'
    })}

    try {
        const hashedpass = await bcrypt.hash(password,salt)

        await pool.query(`INSERT INTO userauthdata (email,hashedpass) VALUES($1,$2)`,[email,hashedpass])
        res.status(201).json({message:'Signup successfully'})

    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({
                message:'Email is already exist'
            })
        }
        console.log(error)
        return res.status(500).json({message:'Something went wrong'})
    }

    next()
}


const userLogin = async(req,res,next) => {
    const {email,password} = req.body

    try {
        const user = await pool.query('SELECT * FROM userauthdata WHERE email = $1',[email])
        //console.log(user)
        if(!user){
        return res.status(404).json({
            message : 'Please signup first'
        })
    }

        const hash = user.rows[0].hashedpass
        const isMatch = bcrypt.compare(password,hash)
        

        if(isMatch){

            const token = setUser(user.rows[0].id)
            res.status(201).cookie('token',token).json({
                message : 'Login Successfully'
            })
    }
} catch (error) {

    console.log(error)
    return res.status(500).json({
        message : 'Something went wrong'
    })
    
}
}

module.exports = {userSignUp,userLogin}