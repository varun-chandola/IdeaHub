import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const app = express()

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_CONNECTION_URL)
        console.log(`db connection host : ${db.connection.host}`)
    } catch (error) {
        return error.message
    }
}


connectDB()
app.get('/', async (req, res) => {
    return res.json('Home Route')
})




app.listen(process.env.PORT, () => console.log(`server running on port : ${process.env.PORT} `))