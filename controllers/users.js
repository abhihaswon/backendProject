const pool = require('../connection')

const handleCreateUsers = async(req,res) => { 
    const {name,age,email} = req.body
    const insertQuery = `INSERT INTO users (name,age,email) VALUES($1,$2,$3)`
    const values = [name,age,email]

   try {
    await pool.query(insertQuery,values)
    res.status(201).json({message:'User Added'})

   } catch (error) {
        console.log(`error : ${error}`)
        res.status(400).json({message:'Something went wrong'})
   }
}

const handleGetUsers = async(req,res)=>{
    const {email} = req.body

    const getQuery = `SELECT * FROM users WHERE email = $1`
    const value = [email]

    try {
        const respose = await pool.query(getQuery,value)
        const user = respose.rows
        res.status(201).json({message:'User Retrived', user})

    } catch (error) {
        console.log(`error : ${error}`)
        res.status(400).json({message:'Something went wrong'})

    }
}

const handleDeleteUser = async(req,res) => {
    const {email} = req.body
    console.log(email)
    const dltQuery = `DELETE FROM users WHERE email = $1`
    const value = [email]

    try {
        await pool.query(dltQuery,value)
        res.status(201).json({message:'User deleted'})

    } catch (error) {
        console.log(`error : ${error}`)
        res.status(400).json({message:'Something went wrong'})

    }
}

const handleUpdateUser = async(req,res) => {
    const currentEmail = req.params.email
    const {name,age,email} = req.body

    const updateQuery = `UPDATE users SET name = $1, age = $2, email = $3 WHERE email = $4`
    const value = [name,age,email,currentEmail]

    try {
        await pool.query(updateQuery,value)
    } catch (error) {
        console.log(`error : ${error}`)
        res.status(400).json({message:'Something went wrong'})

    }
}

module.exports = {
    handleCreateUsers,
    handleUpdateUser,
    handleGetUsers,
    handleDeleteUser
}