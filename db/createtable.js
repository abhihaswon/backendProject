const pool = require('../connection')

const createTable = async () => {
    try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            age INT NOT NULL,
            email TEXT NOT NULL)`)

        console.log("Table created")
    } catch (error) {
        console.log(error)
    }
}

module.exports = createTable