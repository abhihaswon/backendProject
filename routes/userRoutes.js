const {handleCreateUsers,handleUpdateUser,handleGetUsers,handleDeleteUser} = require('../controllers/users')
const express = require('express')

const route = express.Router()

route
.post('/',handleCreateUsers)
.put('/user/:email',handleUpdateUser)
.get('/users',handleGetUsers)
.delete('/',handleDeleteUser)

module.exports = route