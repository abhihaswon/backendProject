require("dotenv").config()
const express = require('express')
const createTable = require('./db/createtable')
const usersRoute = require('./routes/userRoutes')

const app = express()
createTable()
app.use(express.json())
app.use('/',usersRoute)


app.get('/',(req,res)=>{
    return res.send("HELLO FROM SERVER")
})


app.listen(6593,()=>{
    console.log('SERVER IS RUNNING')
})