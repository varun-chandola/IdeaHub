import { Post } from "../models/post.model.js"

export const viewProject = async (req, res) => {
    try {
        const { projectId } = req.params

        const projectById = await Post.findById(projectId)
        return res.json({
            project: projectById
        })
    } catch (error) {
        return res.json({
            msg: "Error in seeing post",
            err: error.message
        })
    }
}