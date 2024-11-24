const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const DbConnection = require('./config/DbConnection')
const userRoute = require('./routes/userRoute')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
DbConnection()
dotenv.config()

app.get('/', (req, res) =>{
    res.json({ Hello: "Word"})
})


app.use('/api', userRoute)

app.listen(process.env.PORT)