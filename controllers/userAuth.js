const pool = require('../connection')
const bcrypt = require('bcrypt');
const salt = 12

const UserSignUp = async(req,res,next) => {
    const {email,password} = req.body;
    const salt = 12;
    
    if(!email || !password) {return res.status(400).json({
        message:'Email and password are required'
    })}

    try {
        const hashedpass = await bcrypt.hash(password,salt)

        const insertString = `INSERT INTO userauthdata (email,hashedpass) VALUES($1,$2)`
        const values = [email,hashedpass]

        await pool.query(insertString,values)
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

module.exports = UserSignUp