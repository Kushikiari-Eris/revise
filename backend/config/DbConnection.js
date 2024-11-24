const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const DbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_KEY)
        console.log('Database Connected Successfully')
    } catch (error) {
        console.log(error)
    }
}

module.exports = DbConnection