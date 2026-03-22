const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()

// Get frontend URL - support both local and production
const frontendUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.FRONTEND_URL || 'http://localhost:3000'

app.use(cors({
    origin: [
        frontendUrl,
        'http://localhost:3000',
        'https://*.vercel.app'
    ],
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api", router)

const PORT = process.env.PORT || 8080

// For local development
if (process.env.NODE_ENV !== 'production') {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log("Connected to DB")
            console.log("Server is running")
        })
    })
}

// For Vercel serverless
module.exports = app
