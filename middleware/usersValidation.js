const usersDataValidation = (req,res) => {
    const {name,age,email} = req.body

    if(name.lenght > 12) { res.status(400).json({error:"Name must not exceed 12 characters"})}

    if(age < 0 && age > 60 ) { res.status(400).json({error:"Name must not exceed 12 characters"})}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(!emailRegex.test(email)) {res.status(400).json({error : "Email is invaild"})}
}

module.exports = usersDataValidation