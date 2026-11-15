const express = require('express')
const router = express.Router()
const UserSignUp = require('../controllers/userAuth')

router
.post('/signup',UserSignUp)


module.exports = router