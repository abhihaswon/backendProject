const {handleCreateUsers,handleUpdateUser,handleGetUsers,handleDeleteUser} = require('../controllers/users')
const express = require('express')
const usersDataValidation = require('../middleware/usersValidation')

const route = express.Router()

route
.post('/create',usersDataValidation,handleCreateUsers)
.put('/update/:email',handleUpdateUser)
.get('/users',handleGetUsers)
.delete('/delete',handleDeleteUser)

module.exports = route