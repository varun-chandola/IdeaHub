import { Post } from "../models/post.model.js"

export const updateProject = async (req, res) => {
    try {
        const { projectId } = req.params
        const { title, level, content, TechStack } = req.body
        if (TechStack == "" && content == "" && level == "" && title == "") return res.status(500).json({
            msg: "Updates Cannot be Empty"
        })

        const update = {}
        if (title && title !== "") update.title = title
        if (level && level !== "Select Level") update.level = level
        if (content && content !== "") {
            if (content?.length > 500) return res.status(401).json({
                msg: "content exceeds the max length of 500"
            })
            update.content = content
        }
        if (TechStack && TechStack !== "") update.TechStack = TechStack?.split(",")?.map(x => x.trim())

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