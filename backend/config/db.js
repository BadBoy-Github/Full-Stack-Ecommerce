const mongoose = require('mongoose')

let isConnected = false

async function connectDB() {
    // Prevent multiple connections in serverless environment
    if (isConnected) {
        console.log("Already connected to MongoDB")
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            bufferCommands: false,
        })
        isConnected = true
        console.log("Connected to MongoDB")
    } catch (err) {
        console.log("MongoDB connection error:", err)
    }
}

module.exports = connectDB