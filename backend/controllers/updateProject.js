import { Post } from "../models/post.model.js"

export const updateProject = async (req, res) => {
    try {
        const { projectId } = req.params
        const { title, level, content, TechStack } = req.body
        const update = {}
        if (title) update.title = title
        if (level) update.level = level
        if (content) update.content = content
        if (TechStack) update.TechStack = TechStack?.split(",")?.map(x => x.trim())

        const updatedInfo = await Post.findByIdAndUpdate(projectId, update, { new: true })
        return res.status(200).json({
            msg: "updated",
            updatedInfo
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Error updating project info",
            err: error.message
        })
    }
}