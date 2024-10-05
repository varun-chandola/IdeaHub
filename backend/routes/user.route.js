import express from "express"
import { signup } from "../controllers/signup.js"
import { login } from "../controllers/login.js"
import { addProject } from "../controllers/addProject.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
const router = express.Router()

router.post('/signup' , signup)
router.post('/login' , login)
router.post('/add-project' , authMiddleware , addProject)

export default router 