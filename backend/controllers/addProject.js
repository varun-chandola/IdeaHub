import { Post } from "../models/post.model.js"
export const addProject = async (req, res) => {
    try {
        const { title, level, TechStack, content } = req.body
        if (!(level || TechStack || content || title))
            return res.status(409).json({
                msg: "All fields are mandatory"
            })

        if (content?.length > 500) return res.status(401).json({
            msg: "content exceeds the max length of 500"
        })


        const newProject = await Post.create({
            owner: req.user?._id,
            title,
            level,
            content,
            TechStack: (TechStack?.split(","))?.map(x => x.trim())
        })

        return res.status(200).json({
            msg: "New Project Idea added",
            // newProject
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Error Creating New project",
            err: error.message
        })
    }
}