const { object } = require('joi')
const pool = require('../connection')

const handleCreateUsers = async(req,res) => { 
    const user_auth_id = req.user.id
    console.log(user_auth_id)
    const {name,age,hobby,email} = req.body

   try {
    await pool.query(
                    `INSERT INTO users (name,age,hobby,email,user_auth_id) VALUES($1,$2,$3,$4,$5)`,
                    [name,age,hobby,email,user_auth_id]
                )
                
    res.status(201).json({message:'User Added'})

   } catch (error) {
        console.log(`error : ${error}`)
        res.status(400).json({message:'Something went wrong'})
   }
}

const handleGetUsers = async(req,res)=>{
    const user_auth_id = req.user.id
    console.log(user_auth_id)

    const getQuery = `SELECT * FROM users WHERE user_auth_id = $1`
    const value = [user_auth_id]

    try {
        const response = await pool.query(`SELECT * FROM users WHERE user_auth_id = $1`,[user_auth_id])
        const data = response.rows
        res.status(201).json({message:'User Retrived', data})

    } catch (error) {
        console.log(`error : ${error}`)
        res.status(400).json({message:'Something went wrong'})

    }
}

const handleDeleteUser = async(req,res) => {
    const user_auth_id = req.user.id
    const {email} = req.body
    console.log(email)

    try {
        await pool.query(`DELETE FROM users WHERE email = $1 AND user_auth_data = $2`,[email,user_auth_id])
        res.status(201).json({message:'User deleted'})

    } catch (error) {
        console.log(`error : ${error}`)
        res.status(400).json({message:'Something went wrong'})

    }
}

// const handleUpdateUser = async(req,res) => {
//     const currentEmail = req.params.email
//     const {name,age,hobby,email} = req.body
//     const user_auth_id = req.user.id


//     try {
//         await pool.query(
//             `UPDATE users SET name = $1, age = $2, email = $3 WHERE email = $4 AND user_auth_id = $5`,
//             [name,age,email,currentEmail,user_auth_id]
//         )
//         res.status(200).json({message:'Updated'})
//     } catch (error) {
//         console.log(`error : ${error}`)
//         res.status(400).json({message:'Something went wrong'})

//     }
// }

const handlePatchUser = async(req,res) => {
    const email = req.params.email
    const feild = req.body
    const key = Object.keys(feild)
    const value = Object.values(feild)

    const queryString = key.map((key,index)=>`${key} = $${index + 1}`).join(", ")

    try {
        await pool.query(`UPDATE users SET  ${queryString} WHERE email = $${value.length + 1}`,[...value,email])
        res.status(200).json({message:'updated'})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Something went wrong'})
    }
}




module.exports = {
    handleCreateUsers,
    handlePatchUser,
    handleGetUsers,
    handleDeleteUser
}