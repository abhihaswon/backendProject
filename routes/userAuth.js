const express = require('express')
const router = express.Router()
const {userSignUp,userLogin} = require('../controllers/userAuth')



router
.post('/signup',userSignUp)
.post('/login',userLogin)


module.exports = router