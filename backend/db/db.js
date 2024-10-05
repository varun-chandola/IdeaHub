import mongoose from "mongoose"
export const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_CONNECTION_URL)
        console.log(`db connection host : ${db.connection.host}`)
    } catch (error) {
        return error.message
    }
}