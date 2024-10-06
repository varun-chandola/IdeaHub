import { Post } from "../models/post.model.js"

export const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params
        await Post.findByIdAndDelete(projectId)
        return res.status(200).json({
            msg: "Project Deleted"
        })


    } catch (error) {
        return res.status(500).json({
            msg: "Error Deleting project",
            err: error.message
        })
    }
}