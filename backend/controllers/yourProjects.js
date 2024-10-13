import { Post } from "../models/post.model.js"

export const yourProjects = async (req, res) => {
    try {
        const yourProjects = await Post.find({
            owner: req.user?._id
        }).populate('owner', 'username').sort({ createdAt: -1 })

        if (yourProjects == null)
            return res.status(200).json({
                msg: "No projects as of Now ! Create Projects"
            })

        return res.status(200).json({
            msg: "Your Projects",
            yourProjects
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Error fetching Your Projects",
            err: error.message
        })
    }
}