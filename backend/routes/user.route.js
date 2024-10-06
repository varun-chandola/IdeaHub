import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { signup } from "../controllers/signup.js"
import { login } from "../controllers/login.js"
import { addProject } from "../controllers/addProject.js"
import { allProjects } from "../controllers/allProjects.js"
import { comment } from "../controllers/comment.js"
import { likeProject } from "../controllers/likeProject.js"
import { viewProject } from "../controllers/viewProject.js"
import { updateProject } from "../controllers/updateProject.js"
import { deleteProject } from "../controllers/deleteProject.js"
import { yourProjects } from "../controllers/yourProjects.js"
const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)

router.get('/all-projects', authMiddleware, allProjects)
router.get('/your-projects' , authMiddleware , yourProjects)

router.post('/add-project', authMiddleware, addProject)

router
    .get('/:projectId', authMiddleware, viewProject)
    .delete('/:projectId', authMiddleware, deleteProject)

router.post('/:projectId/like', authMiddleware, likeProject)
router.patch('/:projectId/edit', authMiddleware, updateProject)
router.post('/:projectId/comment', authMiddleware, comment)

export default router 