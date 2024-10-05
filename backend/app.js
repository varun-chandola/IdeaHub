import express, { urlencoded } from "express"
import { connectDB } from "./db/db.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.route.js"

dotenv.config()

const app = express()
app.use(express.json({urlencoded:"16kb"}))
app.use(cookieParser())
connectDB()

app.use('/api/v1', userRouter)

app.listen(process.env.PORT, () => console.log(`server running on port : ${process.env.PORT} `))