import { Post } from "../models/post.model.js"

export const allProjects = async (req, res) => {
    try {
        const allProjects = await Post.find({})
        return res.status(200).json({
            msg: "All Projects",
            allProjects
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Error Fetching all posts",
            err: error.message
        })
    }
}