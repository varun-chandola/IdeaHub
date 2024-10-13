import express from "express"
const router = express.Router()
import { authMiddleware } from "../middleware/auth.middleware.js"
import { signup } from "../controllers/signup.js"
// import { signup , login , addProject , allProjects , comment , reply , likeProject , viewProject , updateProject , deleteProject , yourProjects} from "../controllers/user.controller.js"

import { login } from "../controllers/login.js"
import { addProject } from "../controllers/addProject.js"
import { allProjects } from "../controllers/allProjects.js"
import { comment } from "../controllers/comment.js"
import { reply } from "../controllers/reply.js"
import { likeProject } from "../controllers/likeProject.js"
import { viewProject } from "../controllers/viewProject.js"
import { updateProject } from "../controllers/updateProject.js"
import { deleteProject } from "../controllers/deleteProject.js"
import { yourProjects } from "../controllers/yourProjects.js"
import { yourLikedProjects } from "../controllers/yourLikedProjects.js"
import { deleteComment } from "../controllers/deleteComment.js"
import { likeComment } from "../controllers/likeComment.js"
import { logout } from "../controllers/logout.js"
import { likeReply } from "../controllers/likeReply.js"

router.post('/signup', signup)
router.post('/login', login)
router.get('/all-projects', authMiddleware, allProjects)
router.get('/your-projects', authMiddleware, yourProjects)
router.get('/your-liked-projects', authMiddleware, yourLikedProjects)
router.post('/add-project', authMiddleware, addProject)
router.get('/project/:projectId', authMiddleware, viewProject)
router.post('/:projectId/like', authMiddleware, likeProject)
router.patch('/:projectId/edit', authMiddleware, updateProject)
router.post('/:projectId/comment', authMiddleware, comment)
router.post('/comment/u/like', authMiddleware, likeComment)
router.post('/reply/u/like', authMiddleware, likeReply)
router.post('/:commentId/reply', authMiddleware, reply)
router.delete('/:projectId/:commentId/delete-comment', authMiddleware, deleteComment)
router.post('/logout', authMiddleware, logout)

router.delete('/:projectId/delete', authMiddleware, deleteProject)
export default router 