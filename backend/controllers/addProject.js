import { Post } from "../models/post.model.js"
export const addProject = async (req, res) => {
    try {
        const { level, TechStack, content } = req.body
        if (!(level || TechStack || content))
            return res.status(409).json({
                msg: "All fields are mandatory"
            })

        const newProject = await Post.create({
            owner: req.user?._id,
            level,
            content,
            TechStack: TechStack?.split(",")
        })

        return res.status(200).json({
            msg: "New Project Idea added",
            newProject
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Error Creating New project",
            err: error.message
        })
    }
}