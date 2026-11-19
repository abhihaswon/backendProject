const {handleCreateUsers,handlePatchUser,handleGetUsers,handleDeleteUser} = require('../controllers/users')
const express = require('express')
const usersDataValidation = require('../middleware/usersValidation')

const route = express.Router()

route
.post('/create',usersDataValidation,handleCreateUsers)
.patch('/update/:email',handlePatchUser)
.get('/users',handleGetUsers)
.delete('/delete',handleDeleteUser)

module.exports = route