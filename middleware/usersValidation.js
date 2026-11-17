
const usersDataValidation = (req, res, next) => {
    const { name, age, email } = req.body;
    console.log(req.body)
    console.log(name)
    console.log(email)

    if (!name || name.length > 12) {
        return res.status(400).json({
            error: "Name must not exceed 12 characters"
        });
    }

    if (age === undefined || Number(age) < 0 || Number(age) > 60) {
        return res.status(400).json({
            error: "Age must be between 0 and 60"
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email || '')) {
        return res.status(400).json({
            error: "Email is invalid"
        });
    }
    
    next();
};

module.exports = usersDataValidation;
