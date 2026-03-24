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

// Allow specific frontend domains for CORS
const allowedOrigins = [
    frontendUrl,
    'http://localhost:3000',
    'https://full-stack-ecommerce-h47u.vercel.app', // User's frontend
    'https://*.vercel.app'
].filter(Boolean)

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// For Vercel serverless - connect to DB on each request
// Must be before routes to ensure DB is connected
app.use(async (req, res, next) => {
    if (!global._mongoConnected) {
        try {
            await connectDB()
            global._mongoConnected = true
        } catch (err) {
            console.log("DB connection error:", err.message)
        }
    }
    next()
})

app.use("/api", router)

const PORT = process.env.PORT || 8080

// Connect to database and start server
async function startServer() {
    try {
        await connectDB()
        console.log("Connected to DB")
    } catch (err) {
        console.log("DB connection error:", err.message)
    }

    if (process.env.NODE_ENV !== 'production') {
        app.listen(PORT, () => {
            console.log("Server is running")
        })
    }
}

// For local development - connect to DB and start server
if (process.env.NODE_ENV !== 'production') {
    startServer()
}

module.exports = app
